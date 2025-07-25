// tracking.api.js
// Thư viện client để gọi API tracking một cách tối ưu

class TrackingAPI {
  constructor(options = {}) {
    this.baseURL = this.getBaseURL();
    this.apiKey = options.apiKey || null;
    this.timeout = options.timeout || 5000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;

    // Batch processing configuration
    this.batchSize = options.batchSize || 10;
    this.batchTimeout = options.batchTimeout || 2000;
    this.eventQueue = [];
    this.batchTimer = null;

    // Auto-flush queue when page unloads
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        this.flush();
      });

      // Also flush periodically
      setInterval(() => {
        if (this.eventQueue.length > 0) {
          this.flush();
        }
      }, 10000); // Flush every 10 seconds
    }
  }

  /**
   * Lấy base URL từ environment
   */
  getBaseURL() {
    if (typeof process !== "undefined" && process.env) {
      return process.env.NODE_ENV === "production"
        ? process.env.URL_PRODUCTION
        : process.env.URL_DEVELOPMENT;
    }

    // Fallback cho browser environment
    return window?.location?.origin?.includes("localhost")
      ? "http://localhost:3002"
      : "http://localhost:3002"; // Có thể thay đổi theo production URL
  }

  /**
   * Tạo headers cho request
   */
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }

    return headers;
  }

  /**
   * Thực hiện HTTP request với retry logic
   */
  async makeRequest(url, options, attempt = 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (attempt < this.retryAttempts && !controller.signal.aborted) {
        await this.delay(this.retryDelay * attempt);
        return this.makeRequest(url, options, attempt + 1);
      }

      throw error;
    }
  }

  /**
   * Delay utility
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Validate event data
   */
  validateEventData(eventData) {
    const required = ["user_id", "event_type", "element_type", "page_url"];
    const validEventTypes = ["click", "view", "scroll", "hover", "load"];
    const validElementTypes = [
      "image",
      "blog",
      "review",
      "service",
      "button",
      "link",
      "video",
    ];

    for (const field of required) {
      if (!eventData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!validEventTypes.includes(eventData.event_type)) {
      throw new Error(
        `Invalid event_type. Must be one of: ${validEventTypes.join(", ")}`
      );
    }

    if (!validElementTypes.includes(eventData.element_type)) {
      throw new Error(
        `Invalid element_type. Must be one of: ${validElementTypes.join(", ")}`
      );
    }

    return true;
  }

  /**
   * Track single event (sẽ được add vào queue để batch processing)
   * @param {Object} eventData - Event data
   * @param {string} eventData.user_id - User ID
   * @param {string} eventData.event_type - Event type (click, view, scroll, hover, load)
   * @param {string} eventData.element_type - Element type (image, blog, review, service, button, link, video)
   * @param {string} eventData.page_url - Page URL
   * @param {string} [eventData.element_id] - Element ID (optional)
   * @param {Object} [eventData.metadata] - Additional metadata (optional)
   * @param {boolean} [immediate=false] - Send immediately without batching
   */
  async track(eventData, immediate = false) {
    try {
      this.validateEventData(eventData);

      if (immediate) {
        return await this.trackImmediate(eventData);
      }

      // Add to queue for batch processing
      this.eventQueue.push({
        ...eventData,
        timestamp: new Date().toISOString(),
      });

      // Start batch timer if not already running
      if (!this.batchTimer) {
        this.batchTimer = setTimeout(() => {
          this.processBatch();
        }, this.batchTimeout);
      }

      // If queue is full, process immediately
      if (this.eventQueue.length >= this.batchSize) {
        clearTimeout(this.batchTimer);
        this.batchTimer = null;
        return await this.processBatch();
      }

      return { queued: true, queueSize: this.eventQueue.length };
    } catch (error) {
      console.error("Tracking error:", error);
      throw error;
    }
  }

  /**
   * Track event immediately (không qua batch)
   */
  async trackImmediate(eventData) {
    const url = `${this.baseURL}/api/tracking/events`;

    return await this.makeRequest(url, {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  }

  /**
   * Process batch of events
   */
  async processBatch() {
    if (this.eventQueue.length === 0) return;

    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];
    this.batchTimer = null;

    try {
      const url = `${this.baseURL}/api/tracking/events/batch`;

      const response = await this.makeRequest(url, {
        method: "POST",
        body: JSON.stringify({ events: eventsToSend }),
      });

      return response;
    } catch (error) {
      console.error("Batch tracking error:", error);
      // Re-queue failed events (with limit to avoid infinite loop)
      if (eventsToSend.length < 100) {
        this.eventQueue.unshift(...eventsToSend);
      }
      throw error;
    }
  }

  /**
   * Force flush all queued events
   */
  async flush() {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    if (this.eventQueue.length > 0) {
      return await this.processBatch();
    }
  }

  /**
   * Track multiple events at once
   */
  async trackBatch(events) {
    try {
      // Validate all events
      events.forEach((event, index) => {
        try {
          this.validateEventData(event);
        } catch (error) {
          throw new Error(`Event at index ${index}: ${error.message}`);
        }
      });

      const url = `${this.baseURL}/api/tracking/events/batch`;

      return await this.makeRequest(url, {
        method: "POST",
        body: JSON.stringify({ events }),
      });
    } catch (error) {
      console.error("Batch tracking error:", error);
      throw error;
    }
  }

  /**
   * Get events with filters
   */
  async getEvents(filters = {}) {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
      });

      const url = `${
        this.baseURL
      }/api/tracking/events?${queryParams.toString()}`;

      return await this.makeRequest(url, {
        method: "GET",
      });
    } catch (error) {
      console.error("Get events error:", error);
      throw error;
    }
  }

  /**
   * Get events by user ID
   */
  async getUserEvents(userId, filters = {}) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
      });

      const url = `${
        this.baseURL
      }/api/tracking/events/user/${userId}?${queryParams.toString()}`;

      return await this.makeRequest(url, {
        method: "GET",
      });
    } catch (error) {
      console.error("Get user events error:", error);
      throw error;
    }
  }

  // Convenience methods for common tracking scenarios

  /**
   * Track click event
   */
  async trackClick(
    userId,
    elementType,
    pageUrl,
    elementId = null,
    metadata = {}
  ) {
    return await this.track(
      {
        user_id: userId,
        event_type: "click",
        element_type: elementType,
        page_url: pageUrl,
        element_id: elementId,
        metadata,
      },
      immediate
    );
  }

  /**
   * Track view event
   */
  async trackView(
    userId,
    elementType,
    pageUrl,
    elementId = null,
    metadata = {},
    immediate = false
  ) {
    return await this.track(
      {
        user_id: userId,
        event_type: "view",
        element_type: elementType,
        page_url: pageUrl,
        element_id: elementId,
        metadata,
      },
      immediate
    );
  }

  /**
   * Track page load event
   */
  async trackPageLoad(userId, pageUrl, metadata = {}, immediate = false) {
    return await this.track(
      {
        user_id: userId,
        event_type: "load",
        element_type: "page",
        page_url: pageUrl,
        metadata: {
          ...metadata,
          loadTime: performance.now(),
          userAgent: navigator.userAgent,
        },
      },
      immediate
    );
  }

  /**
   * Track scroll event
   */
  async trackScroll(
    userId,
    pageUrl,
    scrollPercentage,
    metadata = {},
    immediate = false
  ) {
    return await this.track(
      {
        user_id: userId,
        event_type: "scroll",
        element_type: "page",
        page_url: pageUrl,
        metadata: {
          ...metadata,
          scrollPercentage,
        },
      },
      immediate
    );
  }

  /**
   * Track hover event
   */
  async trackHover(
    userId,
    elementType,
    pageUrl,
    elementId = null,
    metadata = {},
    immediate = false
  ) {
    return await this.track(
      {
        user_id: userId,
        event_type: "hover",
        element_type: elementType,
        page_url: pageUrl,
        element_id: elementId,
        metadata,
      },
      immediate
    );
  }
}

export default TrackingAPI;

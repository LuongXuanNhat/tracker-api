// tracking-client.ts - Event tracking API client
import { BaseClient } from "./base-client";
import { v4 as uuidv4 } from "uuid";
import {
  EventData,
  BatchEventData,
  EventQuery,
  TrackingResponse,
  APIResponse,
} from "./types";

export class TrackingClient extends BaseClient {
  private eventQueue: EventData[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private batchSize: number;
  private batchTimeout: number;
  public visitorId: string | null = null;

  constructor(options: any = {}) {
    super(options);
    this.batchSize = options.batchSize || 10;
    this.batchTimeout = options.batchTimeout || 2000;
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      this.visitorId = localStorage.getItem("tracker_api:visitor_id");
      if (!this.visitorId) {
        this.visitorId = uuidv4();
        localStorage.setItem("tracker_api:visitor_id", this.visitorId);
      }
    } else {
      // fallback trên server, ví dụ dùng UUID tạm thời hoặc null
      console.warn(
        "Running in non-browser environment, using temporary visitor ID"
      );
      this.visitorId = uuidv4(); // hoặc để null
    }

    // Auto-flush queue when page unloads (browser only)
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        this.flush();
      });

      // Periodic flush
      setInterval(() => {
        if (this.eventQueue.length > 0) {
          this.flush();
        }
      }, 10000);
    }
  }

  /**
   * Track a single event
   */
  async trackEvent(
    eventData: EventData,
    immediate: boolean = false
  ): Promise<TrackingResponse> {
    // Validate required fields
    if (!eventData.event_type) {
      throw new Error("event_type is required");
    }
    if (!eventData.event_name) {
      throw new Error("event_name is required");
    }
    if (!eventData.page_url) {
      throw new Error("page_url is required");
    }
    if (!eventData.visitor_id) {
      throw new Error("visitor_id is required");
    }

    // Set default visitor_id if not provided (for backward compatibility)
    if (!eventData.visitor_id && this.visitorId) {
      eventData.visitor_id = this.visitorId;
    }

    // Generate event_id if not provided
    if (!eventData.event_id) {
      eventData.event_id = uuidv4();
    }

    // Set event_date if not provided
    if (!eventData.event_date) {
      const now = new Date();
      eventData.event_date = now.toISOString().split("T")[0]; // YYYY-MM-DD
    }

    // Set event_time if not provided
    if (!eventData.event_time) {
      eventData.event_time = new Date().toISOString();
    }

    const event = {
      ...eventData,
      timestamp: eventData.timestamp || Date.now(), // Keep for backward compatibility
    };

    if (immediate) {
      return this.post("/api/tracking/events", event);
    }

    this.eventQueue.push(event);

    if (this.eventQueue.length >= this.batchSize) {
      return this.flush();
    }

    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => this.flush(), this.batchTimeout);
    }

    return { success: true, message: "Event queued for batch processing" };
  }

  /**
   * Track multiple events at once
   */
  async trackBatch(events: EventData[]): Promise<TrackingResponse> {
    // Validate and enhance each event
    const processedEvents = events.map((event) => {
      // Validate required fields
      if (!event.event_type) {
        throw new Error("event_type is required for all events");
      }
      if (!event.event_name) {
        throw new Error("event_name is required for all events");
      }
      if (!event.page_url) {
        throw new Error("page_url is required for all events");
      }
      if (!event.visitor_id) {
        throw new Error("visitor_id is required for all events");
      }

      // Generate event_id if not provided
      if (!event.event_id) {
        event.event_id = uuidv4();
      }

      // Set event_date if not provided
      if (!event.event_date) {
        const now = new Date();
        event.event_date = now.toISOString().split("T")[0]; // YYYY-MM-DD
      }

      // Set event_time if not provided
      if (!event.event_time) {
        event.event_time = new Date().toISOString();
      }

      return {
        ...event,
        timestamp: event.timestamp || Date.now(),
      };
    });

    return this.post("/api/tracking/events/batch", {
      events: processedEvents,
    });
  }

  /**
   * Flush the event queue
   */
  async flush(): Promise<TrackingResponse> {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    if (this.eventQueue.length === 0) {
      return { success: true, message: "No events to flush" };
    }

    const events = [...this.eventQueue];
    this.eventQueue = [];

    return this.trackBatch(events);
  }

  /**
   * Check tracking health
   */
  async healthCheck(): Promise<APIResponse> {
    return this.get("/api/tracking/health");
  }

  /**
   * Get events by date range
   */
  async getEvents(token: string, query: EventQuery): Promise<APIResponse> {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });

    return this.get(`/api/tracking/events?${params.toString()}`, token);
  }

  /**
   * Get events by user
   */
  async getEventsByUser(token: string, userId: string): Promise<APIResponse> {
    return this.get(`/api/tracking/events/user/${userId}`, token);
  }

  /**
   * Get events by session
   */
  async getEventsBySession(
    token: string,
    sessionId: string
  ): Promise<APIResponse> {
    return this.get(`/api/tracking/events/session/${sessionId}`, token);
  }

  /**
   * Get daily event statistics
   */
  async getDailyStats(
    token: string,
    date: string,
    websiteId?: string
  ): Promise<APIResponse> {
    const params = websiteId ? `?websiteId=${websiteId}` : "";
    return this.get(`/api/tracking/stats/daily/${date}${params}`, token);
  }

  /**
   * Get top pages
   */
  async getTopPages(
    token: string,
    websiteId?: string,
    limit: number = 10
  ): Promise<APIResponse> {
    const params = new URLSearchParams();
    if (websiteId) params.append("websiteId", websiteId);
    if (limit) params.append("limit", String(limit));

    return this.get(
      `/api/tracking/stats/top-pages?${params.toString()}`,
      token
    );
  }

  // Convenience methods for specific event types
  async trackPageView(
    visitorId: string,
    pageUrl: string,
    sessionId?: string,
    metadata?: Record<string, any>
  ): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: "pageview",
      event_name: "page_view",
      page_url: pageUrl,
      visitor_id: visitorId || this.visitorId || uuidv4(),
      user_id: visitorId, // Can be same as visitor_id or null for anonymous
      session_id: sessionId,
      metadata,
    });
  }

  async trackClick(
    visitorId: string,
    elementType: string,
    pageUrl: string,
    elementId?: string,
    sessionId?: string,
    metadata?: Record<string, any>
  ): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: "click",
      event_name: `${elementType}_click`,
      page_url: pageUrl,
      visitor_id: visitorId || this.visitorId || uuidv4(),
      user_id: visitorId,
      session_id: sessionId,
      element_type: elementType,
      element_id: elementId,
      metadata,
    });
  }

  async trackScroll(
    visitorId: string,
    pageUrl: string,
    scrollPercentage: number,
    sessionId?: string,
    metadata?: Record<string, any>
  ): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: "scroll",
      event_name: "page_scroll",
      page_url: pageUrl,
      visitor_id: visitorId || this.visitorId || uuidv4(),
      user_id: visitorId,
      session_id: sessionId,
      properties: {
        scroll_percentage: scrollPercentage.toString(),
      },
      metadata: {
        ...metadata,
        scrollPercentage,
      },
    });
  }

  async trackCustomEvent(
    eventType: string,
    visitorId: string,
    pageUrl: string,
    sessionId?: string,
    metadata?: Record<string, any>
  ): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: eventType,
      event_name: eventType,
      page_url: pageUrl,
      visitor_id: visitorId || this.visitorId || uuidv4(),
      user_id: visitorId,
      session_id: sessionId,
      metadata,
    });
  }
}

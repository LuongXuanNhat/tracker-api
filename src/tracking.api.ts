// tracking.api.ts
import { TrackerOptions, EventData, TrackingResponse } from "./types";

export class TrackingAPI {
  private baseURL: string;
  private apiKey: string | null;
  private timeout: number;
  private retryAttempts: number;
  private retryDelay: number;
  private batchSize: number;
  private batchTimeout: number;
  private eventQueue: EventData[];
  private batchTimer: NodeJS.Timeout | null;

  constructor(options: TrackerOptions = {}) {
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

  private getBaseURL(): string {
    if (typeof process !== "undefined" && process.env) {
      return process.env.NODE_ENV === "production"
        ? (process.env.URL_PRODUCTION as string)
        : (process.env.URL_DEVELOPMENT as string);
    }

    // Fallback for browser environment
    return typeof window !== "undefined" &&
      window?.location?.origin?.includes("localhost")
      ? "http://localhost:3002/api"
      : "http://localhost:3002/api"; // Can be changed to production URL
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }

    return headers;
  }

  private async makeRequest(
    url: string,
    options: RequestInit,
    attempt: number = 1
  ): Promise<TrackingResponse> {
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

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async track(
    eventData: EventData,
    immediate: boolean = false
  ): Promise<TrackingResponse | null> {
    const event = {
      ...eventData,
      timestamp: Date.now(),
    };

    if (immediate) {
      return this.sendEvents([event]);
    }

    this.eventQueue.push(event);

    if (this.eventQueue.length >= this.batchSize) {
      return this.flush();
    }

    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => this.flush(), this.batchTimeout);
    }

    return null;
  }

  public async trackBatch(events: EventData[]): Promise<TrackingResponse> {
    const eventsWithTimestamp = events.map((event) => ({
      ...event,
      timestamp: Date.now(),
    }));

    return this.sendEvents(eventsWithTimestamp);
  }

  public async trackClick(
    userId: string,
    elementType: string,
    pageUrl: string,
    elementId: string | null = null,
    metadata: Record<string, any> = {},
    immediate: boolean = false
  ): Promise<TrackingResponse | null> {
    return this.track(
      {
        userId,
        eventType: "click",
        elementType,
        pageUrl,
        elementId,
        metadata,
      },
      immediate
    );
  }

  public async trackView(
    userId: string,
    elementType: string,
    pageUrl: string,
    elementId: string | null = null,
    metadata: Record<string, any> = {},
    immediate: boolean = false
  ): Promise<TrackingResponse | null> {
    return this.track(
      {
        userId,
        eventType: "view",
        elementType,
        pageUrl,
        elementId,
        metadata,
      },
      immediate
    );
  }

  public async trackPageLoad(
    userId: string,
    pageUrl: string,
    metadata: Record<string, any> = {},
    immediate: boolean = false
  ): Promise<TrackingResponse | null> {
    return this.track(
      {
        userId,
        eventType: "pageload",
        pageUrl,
        metadata,
      },
      immediate
    );
  }

  public async trackScroll(
    userId: string,
    pageUrl: string,
    scrollPercentage: number,
    metadata: Record<string, any> = {},
    immediate: boolean = false
  ): Promise<TrackingResponse | null> {
    return this.track(
      {
        userId,
        eventType: "scroll",
        pageUrl,
        metadata: {
          ...metadata,
          scrollPercentage,
        },
      },
      immediate
    );
  }

  private async sendEvents(events: EventData[]): Promise<TrackingResponse> {
    return this.makeRequest(`${this.baseURL}/track`, {
      method: "POST",
      body: JSON.stringify({ events }),
    });
  }

  public async flush(): Promise<TrackingResponse | null> {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    if (this.eventQueue.length === 0) {
      return null;
    }

    const events = [...this.eventQueue];
    this.eventQueue = [];

    return this.sendEvents(events);
  }
}

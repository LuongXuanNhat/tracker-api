// tracking-client.ts - Event tracking API client
import { BaseClient } from './base-client';
import { 
  EventData, 
  BatchEventData,
  EventQuery,
  TrackingResponse,
  APIResponse
} from './types';

export class TrackingClient extends BaseClient {
  private eventQueue: EventData[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private batchSize: number;
  private batchTimeout: number;

  constructor(options: any = {}) {
    super(options);
    this.batchSize = options.batchSize || 10;
    this.batchTimeout = options.batchTimeout || 2000;

    // Auto-flush queue when page unloads (browser only)
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
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
  async trackEvent(eventData: EventData, immediate: boolean = false): Promise<TrackingResponse> {
    const event = {
      ...eventData,
      timestamp: eventData.timestamp || Date.now(),
    };

    if (immediate) {
      return this.post('/api/tracking/events', event);
    }

    this.eventQueue.push(event);
    
    if (this.eventQueue.length >= this.batchSize) {
      return this.flush();
    }
    
    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => this.flush(), this.batchTimeout);
    }
    
    return { success: true, message: 'Event queued for batch processing' };
  }

  /**
   * Track multiple events at once
   */
  async trackBatch(events: EventData[]): Promise<TrackingResponse> {
    const eventsWithTimestamp = events.map(event => ({
      ...event,
      timestamp: event.timestamp || Date.now(),
    }));
    
    return this.post('/api/tracking/events/batch', { events: eventsWithTimestamp });
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
      return { success: true, message: 'No events to flush' };
    }
    
    const events = [...this.eventQueue];
    this.eventQueue = [];
    
    return this.trackBatch(events);
  }

  /**
   * Check tracking health
   */
  async healthCheck(): Promise<APIResponse> {
    return this.get('/api/tracking/health');
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
  async getEventsBySession(token: string, sessionId: string): Promise<APIResponse> {
    return this.get(`/api/tracking/events/session/${sessionId}`, token);
  }

  /**
   * Get daily event statistics
   */
  async getDailyStats(token: string, date: string, websiteId?: string): Promise<APIResponse> {
    const params = websiteId ? `?websiteId=${websiteId}` : '';
    return this.get(`/api/tracking/stats/daily/${date}${params}`, token);
  }

  /**
   * Get top pages
   */
  async getTopPages(token: string, websiteId?: string, limit: number = 10): Promise<APIResponse> {
    const params = new URLSearchParams();
    if (websiteId) params.append('websiteId', websiteId);
    if (limit) params.append('limit', String(limit));
    
    return this.get(`/api/tracking/stats/top-pages?${params.toString()}`, token);
  }

  // Convenience methods for specific event types
  async trackPageView(userId: string, pageUrl: string, sessionId?: string, metadata?: Record<string, any>): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: 'page_view',
      page_url: pageUrl,
      user_id: userId,
      session_id: sessionId,
      metadata,
    });
  }

  async trackClick(userId: string, elementType: string, pageUrl: string, elementId?: string, sessionId?: string, metadata?: Record<string, any>): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: 'click',
      element_type: elementType,
      page_url: pageUrl,
      element_id: elementId,
      user_id: userId,
      session_id: sessionId,
      metadata,
    });
  }

  async trackScroll(userId: string, pageUrl: string, scrollPercentage: number, sessionId?: string, metadata?: Record<string, any>): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: 'scroll',
      page_url: pageUrl,
      user_id: userId,
      session_id: sessionId,
      metadata: {
        ...metadata,
        scrollPercentage,
      },
    });
  }

  async trackCustomEvent(eventType: string, userId: string, pageUrl: string, sessionId?: string, metadata?: Record<string, any>): Promise<TrackingResponse> {
    return this.trackEvent({
      event_type: eventType,
      page_url: pageUrl,
      user_id: userId,
      session_id: sessionId,
      metadata,
    });
  }
}

// lib/tracking-client.js - Event tracking client (JavaScript version)
const { BaseClient } = require('./base-client');

class TrackingClient extends BaseClient {
  constructor(options = {}) {
    super(options);
    this.batchSize = options.batchSize || 10;
    this.batchTimeout = options.batchTimeout || 2000;
    this.eventQueue = [];
    this.batchTimer = null;

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

  async trackEvent(eventData, immediate = false) {
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

  async trackBatch(events) {
    const eventsWithTimestamp = events.map(event => ({
      ...event,
      timestamp: event.timestamp || Date.now(),
    }));
    
    return this.post('/api/tracking/events/batch', { events: eventsWithTimestamp });
  }

  async flush() {
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

  async healthCheck() {
    return this.get('/api/tracking/health');
  }

  async getEvents(token, query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    
    return this.get(`/api/tracking/events?${params.toString()}`, token);
  }

  async getEventsByUser(token, userId) {
    return this.get(`/api/tracking/events/user/${userId}`, token);
  }

  async getEventsBySession(token, sessionId) {
    return this.get(`/api/tracking/events/session/${sessionId}`, token);
  }

  async getDailyStats(token, date, websiteId) {
    const params = websiteId ? `?websiteId=${websiteId}` : '';
    return this.get(`/api/tracking/stats/daily/${date}${params}`, token);
  }

  async getTopPages(token, websiteId, limit = 10) {
    const params = new URLSearchParams();
    if (websiteId) params.append('websiteId', websiteId);
    if (limit) params.append('limit', String(limit));
    
    return this.get(`/api/tracking/stats/top-pages?${params.toString()}`, token);
  }

  // Convenience methods for specific event types
  async trackPageView(userId, pageUrl, sessionId, metadata) {
    return this.trackEvent({
      event_type: 'page_view',
      page_url: pageUrl,
      user_id: userId,
      session_id: sessionId,
      metadata,
    });
  }

  async trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata) {
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

  async trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata) {
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

  async trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata) {
    return this.trackEvent({
      event_type: eventType,
      page_url: pageUrl,
      user_id: userId,
      session_id: sessionId,
      metadata,
    });
  }
}

module.exports = { TrackingClient };

// tracking-api-new.js - Main API client combining all modules (JavaScript version)

// Import individual clients
import { BaseClient } from './lib/base-client.js';
import { CustomerClient } from './lib/customer-client.js';
import { WebsiteClient } from './lib/website-client.js';
import { APIKeyClient } from './lib/apikey-client.js';
import { TrackingClient } from './lib/tracking-client.js';
import { UserClient } from './lib/user-client.js';
import { AnalyticsClient } from './lib/analytics-client.js';

class TrackingAPI {
  constructor(options = {}) {
    // Initialize all client modules
    this.customers = new CustomerClient(options);
    this.websites = new WebsiteClient(options);
    this.apiKeys = new APIKeyClient(options);
    this.tracking = new TrackingClient(options);
    this.users = new UserClient(options);
    this.analytics = new AnalyticsClient(options);

    this.token = null;
  }

  /**
   * Set authentication token for API calls
   */
  setToken(token) {
    this.token = token;
  }

  /**
   * Get current authentication token
   */
  getToken() {
    return this.token;
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null;
  }

  /**
   * Check API health
   */
  async healthCheck() {
    return this.tracking.healthCheck();
  }

  // Convenience methods that delegate to tracking client
  async track(eventData, immediate) {
    return this.tracking.trackEvent(eventData, immediate);
  }

  async trackBatch(events) {
    return this.tracking.trackBatch(events);
  }

  async trackPageView(userId, pageUrl, sessionId, metadata) {
    return this.tracking.trackPageView(userId, pageUrl, sessionId, metadata);
  }

  async trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata) {
    return this.tracking.trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata);
  }

  async trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata) {
    return this.tracking.trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata);
  }

  async trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata) {
    return this.tracking.trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata);
  }

  async flush() {
    return this.tracking.flush();
  }

  // Legacy methods for backward compatibility
  async trackPageLoad(userId, pageUrl, metadata) {
    return this.trackPageView(userId, pageUrl, undefined, metadata);
  }

  async trackView(userId, elementType, pageUrl, elementId, metadata) {
    return this.trackCustomEvent('view', userId, pageUrl, undefined, {
      elementType,
      elementId,
      ...metadata
    });
  }

  async trackHover(userId, elementType, pageUrl, elementId, metadata) {
    return this.trackCustomEvent('hover', userId, pageUrl, undefined, {
      elementType,
      elementId,
      ...metadata
    });
  }

  async getEvents(filters) {
    if (!this.token) {
      throw new Error('Authentication token required for getEvents');
    }
    return this.tracking.getEvents(this.token, filters);
  }

  async getUserEvents(userId, filters) {
    if (!this.token) {
      throw new Error('Authentication token required for getUserEvents');
    }
    return this.tracking.getEventsByUser(this.token, userId);
  }
}

export default TrackingAPI;

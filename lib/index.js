// lib/index.js - Main entry point for JavaScript users (CommonJS)
const { BaseClient } = require('./base-client');
const { TrackingClient } = require('./tracking-client');
const { CustomerClient } = require('./customer-client');
const { WebsiteClient } = require('./website-client');
const { APIKeyClient } = require('./apikey-client');
const { UserClient } = require('./user-client');
const { AnalyticsClient } = require('./analytics-client');

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

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = null;
  }

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

// Singleton instance for global usage
let globalTracker = null;

/**
 * Initialize global tracker instance
 */
function init(options = {}) {
  globalTracker = new TrackingAPI(options);
  return globalTracker;
}

/**
 * Get global tracker instance
 */
function getTracker() {
  if (!globalTracker) {
    console.warn('Tracker not initialized. Call init() first.');
    return null;
  }
  return globalTracker;
}

/**
 * Create new tracker instance
 */
function createTracker(options = {}) {
  return new TrackingAPI(options);
}

// Convenience functions using global tracker
async function track(eventData, immediate = false) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.track(eventData, immediate);
}

async function trackBatch(events) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackBatch(events);
}

async function trackPageView(userId, pageUrl, sessionId, metadata) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackPageView(userId, pageUrl, sessionId, metadata);
}

async function trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata);
}

async function trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata);
}

async function trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata);
}

// Legacy methods
async function trackPageLoad(userId, pageUrl, metadata) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackPageLoad(userId, pageUrl, metadata);
}

async function trackView(userId, elementType, pageUrl, elementId, metadata) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackView(userId, elementType, pageUrl, elementId, metadata);
}

async function trackHover(userId, elementType, pageUrl, elementId, metadata) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackHover(userId, elementType, pageUrl, elementId, metadata);
}

async function getEvents(filters = {}) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.getEvents(filters);
}

async function getUserEvents(userId, filters = {}) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.getUserEvents(userId, filters);
}

async function flush() {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.flush();
}

module.exports = {
  // Classes
  TrackingAPI,
  BaseClient,
  TrackingClient,
  CustomerClient,
  WebsiteClient,
  APIKeyClient,
  UserClient,
  AnalyticsClient,
  
  // Setup functions
  init,
  getTracker,
  createTracker,
  
  // Core tracking
  track,
  trackBatch,
  trackPageView,
  trackClick,
  trackScroll,
  trackCustomEvent,
  
  // Legacy methods
  trackPageLoad,
  trackView,
  trackHover,
  
  // Data retrieval
  getEvents,
  getUserEvents,
  
  // Utility
  flush,
};

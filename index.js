// index.js
// Entry point cho tracker-api library - Updated version

import TrackingAPI from "./tracking-api-new.js";

// Singleton instance cho global usage
let globalTracker = null;

/**
 * Initialize global tracker instance
 * @param {Object} options - Configuration options
 * @param {string} [options.apiKey] - API key for authentication
 * @param {string} [options.baseUrl] - Base URL for API
 * @param {number} [options.timeout=5000] - Request timeout in milliseconds
 * @param {number} [options.retryAttempts=3] - Number of retry attempts
 * @param {number} [options.retryDelay=1000] - Delay between retries in milliseconds
 * @param {number} [options.batchSize=10] - Number of events to batch together
 * @param {number} [options.batchTimeout=2000] - Time to wait before sending batch
 * @param {boolean} [options.debug=false] - Enable debug logging
 * @param {boolean} [force=false] - Force re-initialize with new options
 * @returns {TrackingAPI} Tracker instance
 */
export function init(options = {}, force = false) {
  if (!globalTracker || force) {
    globalTracker = new TrackingAPI(options);
  }
  return globalTracker;
}

/**
 * Get global tracker instance
 * @returns {TrackingAPI|null} Global tracker instance
 */
export function getTracker() {
  if (!globalTracker) {
    globalTracker = new TrackingAPI({
      apiKey: process.env.NEXT_PUBLIC_TRACKING_API_KEY,
    });
  }
  return globalTracker;
}

/**
 * Create new tracker instance (không dùng global)
 * @param {Object} options - Configuration options
 * @returns {TrackingAPI} New tracker instance
 */
export function createTracker(options = {}) {
  return new TrackingAPI(options);
}

/**
 * Track an event using global tracker
 * @param {Object} eventData - Event data
 * @param {boolean} [immediate=false] - Send immediately
 */
export async function track(eventData, immediate = false) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.track(eventData, immediate);
}

/**
 * Track multiple events at once using global tracker
 * @param {Array} events - Array of event objects
 */
export async function trackBatch(events) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackBatch(events);
}

/**
 * Track page view event using global tracker
 */
export async function trackPageView(
  userId,
  pageUrl,
  sessionId = null,
  metadata = {}
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackPageView(userId, pageUrl, sessionId, metadata);
}

/**
 * Track click event using global tracker
 */
export async function trackClick(
  userId,
  elementType,
  pageUrl,
  elementId = null,
  sessionId = null,
  metadata = {}
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackClick(
    userId,
    elementType,
    pageUrl,
    elementId,
    sessionId,
    metadata
  );
}

/**
 * Track scroll event using global tracker
 */
export async function trackScroll(
  userId,
  pageUrl,
  scrollPercentage,
  sessionId = null,
  metadata = {}
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata);
}

/**
 * Track custom event using global tracker
 */
export async function trackCustomEvent(
  eventType,
  userId,
  pageUrl,
  sessionId = null,
  metadata = {}
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata);
}

// Legacy methods for backward compatibility
/**
 * Track page load event using global tracker
 * @deprecated Use trackPageView instead
 */
export async function trackPageLoad(userId, pageUrl, metadata = {}) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackPageLoad(userId, pageUrl, metadata);
}

/**
 * Track view event using global tracker
 * @deprecated Use trackCustomEvent with 'view' type instead
 */
export async function trackView(
  userId,
  elementType,
  pageUrl,
  elementId = null,
  metadata = {}
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackView(userId, elementType, pageUrl, elementId, metadata);
}

/**
 * Track hover event using global tracker
 * @deprecated Use trackCustomEvent with 'hover' type instead
 */
export async function trackHover(
  userId,
  elementType,
  pageUrl,
  elementId = null,
  metadata = {}
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackHover(
    userId,
    elementType,
    pageUrl,
    elementId,
    metadata
  );
}

/**
 * Get events with filters using global tracker
 * @deprecated Requires authentication token - use tracker.setToken() first
 */
export async function getEvents(filters = {}) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.getEvents(filters);
}

/**
 * Get events by user ID using global tracker
 * @deprecated Requires authentication token - use tracker.setToken() first
 */
export async function getUserEvents(userId, filters = {}) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.getUserEvents(userId, filters);
}

/**
 * Flush all queued events using global tracker
 */
export async function flush() {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.flush();
}

// Export class for advanced usage
export { TrackingAPI };

// Default export with all functions
export default {
  // Core functions
  init,
  getTracker,
  createTracker,
  
  // Event tracking
  track,
  trackBatch,
  trackPageView,
  trackClick,
  trackScroll,
  trackCustomEvent,
  
  // Legacy methods (deprecated)
  trackPageLoad,
  trackView,
  trackHover,
  
  // Data retrieval (requires auth)
  getEvents,
  getUserEvents,
  
  // Utility
  flush,
  
  // Class export
  TrackingAPI,
};

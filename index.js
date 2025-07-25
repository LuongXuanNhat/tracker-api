// index.js
// Entry point cho tracker-api library

import TrackingAPI from "./tracking.api.js";

// Singleton instance cho global usage
let globalTracker = null;

/**
 * Initialize global tracker instance
 * @param {Object} options - Configuration options
 * @param {string} [options.apiKey] - API key for authentication
 * @param {number} [options.timeout=5000] - Request timeout in milliseconds
 * @param {number} [options.retryAttempts=3] - Number of retry attempts
 * @param {number} [options.retryDelay=1000] - Delay between retries in milliseconds
 * @param {number} [options.batchSize=10] - Number of events to batch together
 * @param {number} [options.batchTimeout=2000] - Time to wait before sending batch
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
    console.warn("Tracker not initialized. Call init() first.");
    return null;
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

// Convenience methods sử dụng global tracker
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
 * Track click event using global tracker
 */
export async function trackClick(
  userId,
  elementType,
  pageUrl,
  elementId = null,
  metadata = {},
  immediate = false
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackClick(
    userId,
    elementType,
    pageUrl,
    elementId,
    metadata,
    immediate
  );
}

/**
 * Track view event using global tracker
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
  return await tracker.trackView(
    userId,
    elementType,
    pageUrl,
    elementId,
    metadata
  );
}

/**
 * Track page load event using global tracker
 */
export async function trackPageLoad(userId, pageUrl, metadata = {}) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackPageLoad(userId, pageUrl, metadata);
}

/**
 * Track scroll event using global tracker
 */
export async function trackScroll(
  userId,
  pageUrl,
  scrollPercentage,
  metadata = {}
) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackScroll(userId, pageUrl, scrollPercentage, metadata);
}

/**
 * Track hover event using global tracker
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
 */
export async function getEvents(filters = {}) {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.getEvents(filters);
}

/**
 * Get events by user ID using global tracker
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

// Default export
export default {
  init,
  getTracker,
  createTracker,
  track,
  trackBatch,
  trackClick,
  trackView,
  trackPageLoad,
  trackScroll,
  trackHover,
  getEvents,
  getUserEvents,
  flush,
  TrackingAPI,
};

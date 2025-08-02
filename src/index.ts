// index-new.ts - Main entry point for the tracking library
import { TrackingAPI } from './tracking-api';
import { TrackerOptions, EventData, TrackingResponse } from './types';

// Singleton instance for global usage
let globalTracker: TrackingAPI | null = null;

/**
 * Initialize global tracker instance
 * @param options - Configuration options
 * @returns Tracker instance
 */
export function init(options: TrackerOptions = {}): TrackingAPI {
  globalTracker = new TrackingAPI(options);
  return globalTracker;
}

/**
 * Get global tracker instance
 * @returns Global tracker instance
 */
export function getTracker(): TrackingAPI | null {
  if (!globalTracker) {
    console.warn('Tracker not initialized. Call init() first.');
    return null;
  }
  return globalTracker;
}

/**
 * Create new tracker instance (không dùng global)
 * @param options - Configuration options
 * @returns New tracker instance
 */
export function createTracker(options: TrackerOptions = {}): TrackingAPI {
  return new TrackingAPI(options);
}

// Convenience functions using global tracker for quick tracking

/**
 * Track a custom event using global tracker
 */
export async function track(eventData: EventData, immediate: boolean = false): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.track(eventData, immediate);
}

/**
 * Track multiple events at once using global tracker
 */
export async function trackBatch(events: EventData[]): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackBatch(events);
}

/**
 * Track page view event using global tracker
 */
export async function trackPageView(
  userId: string,
  pageUrl: string,
  sessionId?: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackPageView(userId, pageUrl, sessionId, metadata);
}

/**
 * Track click event using global tracker
 */
export async function trackClick(
  userId: string,
  elementType: string,
  pageUrl: string,
  elementId?: string,
  sessionId?: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata);
}

/**
 * Track scroll event using global tracker
 */
export async function trackScroll(
  userId: string,
  pageUrl: string,
  scrollPercentage: number,
  sessionId?: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata);
}

/**
 * Track custom event using global tracker
 */
export async function trackCustomEvent(
  eventType: string,
  userId: string,
  pageUrl: string,
  sessionId?: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata);
}

/**
 * Flush pending events using global tracker
 */
export async function flush(): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.flush();
}

// Export main classes and types
export { TrackingAPI } from './tracking-api';
export { CustomerClient } from './customer-client';
export { WebsiteClient } from './website-client';
export { APIKeyClient } from './apikey-client';
export { TrackingClient } from './tracking-client';
export { UserClient } from './user-client';
export { AnalyticsClient } from './analytics-client';

// Export all types
export * from './types';

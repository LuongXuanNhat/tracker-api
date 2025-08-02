// index.ts
import { TrackingAPI } from "./tracking.api";
import { TrackerOptions, EventData, TrackingResponse } from "./types";

// Singleton instance for global usage
let globalTracker: TrackingAPI | null = null;

/**
 * Initialize global tracker instance
 * @param options - Configuration options
 * @param force - Force re-initialize with new options (default: false)
 * @returns Tracker instance
 */
export function init(
  options: TrackerOptions = {},
  force: boolean = false
): TrackingAPI {
  if (!globalTracker || force) {
    globalTracker = new TrackingAPI(options);
  }
  return globalTracker;
}

/**
 * Get global tracker instance
 * @returns Global tracker instance
 */
export function getTracker(): TrackingAPI | null {
  if (!globalTracker) {
    globalTracker = new TrackingAPI({
      apiKey: process.env.NEXT_PUBLIC_TRACKING_API_KEY,
    });
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

/**
 * Track an event using global tracker
 * @param eventData - Event data
 * @param immediate - Send immediately
 */
export async function track(
  eventData: EventData,
  immediate: boolean = false
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.track(eventData, immediate);
}

/**
 * Track multiple events at once using global tracker
 * @param events - Array of event objects
 */
export async function trackBatch(
  events: EventData[]
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackBatch(events);
}

/**
 * Track click event using global tracker
 */
export async function trackClick(
  userId: string,
  elementType: string,
  pageUrl: string,
  elementId: string | null = null,
  metadata: Record<string, any> = {},
  immediate: boolean = false
): Promise<TrackingResponse | null> {
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
  userId: string,
  elementType: string,
  pageUrl: string,
  elementId: string | null = null,
  metadata: Record<string, any> = {},
  immediate: boolean = false
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackView(
    userId,
    elementType,
    pageUrl,
    elementId,
    metadata,
    immediate
  );
}

/**
 * Track page load event using global tracker
 */
export async function trackPageLoad(
  userId: string,
  pageUrl: string,
  metadata: Record<string, any> = {},
  immediate: boolean = false
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackPageLoad(userId, pageUrl, metadata, immediate);
}

/**
 * Track scroll event using global tracker
 */
export async function trackScroll(
  userId: string,
  pageUrl: string,
  scrollPercentage: number,
  metadata: Record<string, any> = {},
  immediate: boolean = false
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackScroll(
    userId,
    pageUrl,
    scrollPercentage,
    metadata,
    immediate
  );
}

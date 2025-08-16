// src/browser.ts - Browser-specific entry point
// This file includes all the main functionality but without Node.js dependencies

import { TrackingAPI } from "./tracking-api";
import { TrackerOptions, EventData, TrackingResponse } from "./types";
import { TrackerEnum } from "./tracker.enum";

// Browser-specific global tracker
let globalTracker: TrackingAPI | null = null;

/**
 * Initialize global tracker instance for browser
 * @param options - Configuration options (apiKey and baseUrl required for browser)
 * @returns Tracker instance
 */
export function init(options: TrackerOptions = {}): TrackingAPI {
  if (!options.apiKey) {
    console.warn("TrackerAPI: apiKey is required for browser usage");
  }
  if (!options.baseUrl) {
    console.warn("TrackerAPI: baseUrl is required for browser usage");
  }

  globalTracker = new TrackingAPI(options);
  return globalTracker;
}

/**
 * Get global tracker instance for browser
 * @returns Global tracker instance
 */
export function getTracker(): TrackingAPI | null {
  if (!globalTracker) {
    console.warn(
      "TrackerAPI: Please call init() first with apiKey and baseUrl"
    );
    return null;
  }
  return globalTracker;
}

/**
 * Create new tracker instance
 * @param options - Configuration options
 * @returns New tracker instance
 */
export function createTracker(options: TrackerOptions = {}): TrackingAPI {
  return new TrackingAPI(options);
}

// Convenience functions using global tracker

/**
 * Track a custom event using global tracker
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
 */
export async function trackBatch(
  events: EventData[]
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackBatch(events);
}

// ===== EVENT TYPE SPECIFIC TRACKING FUNCTIONS =====

/**
 * Track page view event
 */
export async function trackPageView(
  eventData: Partial<EventData> & {
    page_url: string;
    page_title?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.pageview,
    event_name: eventData.event_name || TrackerEnum.EventName.view_product,
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track click event
 */
export async function trackClick(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
    element_text?: string;
    element_id?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.click,
    event_name: eventData.event_name || TrackerEnum.EventName.button_click,
    visitor_id: eventData.visitor_id || "",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track submit event
 */
export async function trackSubmit(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.submit,
    event_name:
      eventData.event_name || TrackerEnum.EventName.contact_form_submit,
    visitor_id: eventData.visitor_id || "",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track scroll event
 */
export async function trackScroll(
  eventData: Partial<EventData> & {
    page_url: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.scroll,
    event_name: eventData.event_name || TrackerEnum.EventName.scroll_to_bottom,
    visitor_id: eventData.visitor_id || "",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track input change event
 */
export async function trackChange(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.change,
    event_name: eventData.event_name || TrackerEnum.EventName.form_input_change,
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "",
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

// Business-specific functions

/**
 * Track add to cart action
 */
export async function trackAddToCart(
  eventData: Partial<EventData> & {
    page_url: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  return await trackClick({
    ...eventData,
    event_name: TrackerEnum.EventName.add_to_cart,
    element_selector:
      eventData.element_selector ||
      TrackerEnum.ElementSelector.add_to_cart_button,
    element_text: eventData.element_text || TrackerEnum.ElementText.add_to_cart,
  });
}

/**
 * Track purchase event
 */
export async function trackPurchase(
  eventData: Partial<EventData> & {
    page_url: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  return await trackSubmit({
    ...eventData,
    event_name: TrackerEnum.EventName.purchase,
  });
}

/**
 * Track login form submission
 */
export async function trackLoginFormSubmit(
  eventData: Partial<EventData> & {
    page_url: string;
  }
): Promise<TrackingResponse | null> {
  return await trackSubmit({
    ...eventData,
    event_name: TrackerEnum.EventName.login_form_submit,
    element_selector:
      eventData.element_selector || TrackerEnum.ElementSelector.login_button,
    element_text: eventData.element_text || TrackerEnum.ElementText.login,
  });
}

/**
 * Track signup form submission
 */
export async function trackSignupFormSubmit(
  eventData: Partial<EventData> & {
    page_url: string;
  }
): Promise<TrackingResponse | null> {
  return await trackSubmit({
    ...eventData,
    event_name: TrackerEnum.EventName.signup_form_submit,
    element_selector:
      eventData.element_selector || TrackerEnum.ElementSelector.signup_button,
    element_text: eventData.element_text || TrackerEnum.ElementText.signup,
  });
}

/**
 * Track search query submission
 */
export async function trackSearchQuerySubmit(
  eventData: Partial<EventData> & {
    page_url: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  return await trackSubmit({
    ...eventData,
    event_name: TrackerEnum.EventName.search_query_submit,
    element_selector:
      eventData.element_selector || TrackerEnum.ElementSelector.search_input,
    element_text: eventData.element_text || TrackerEnum.ElementText.search,
  });
}

/**
 * Flush pending events using global tracker
 */
export async function flush(): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.flush();
}

// Export main classes and types for browser
export { TrackingAPI } from "./tracking-api";
export { TrackerEnum } from "./tracker.enum";
export { EventData, TrackingResponse, TrackerOptions } from "./types";

// Export all types
export * from "./types";

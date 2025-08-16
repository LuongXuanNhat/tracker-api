// index.ts - Main entry point for the tracking library
import { TrackingAPI } from "./tracking-api";
import { TrackerOptions, EventData, TrackingResponse } from "./types";
import { TrackerEnum } from "./tracker.enum";

// Singleton instance for global usage
let globalTracker: TrackingAPI | null = null;

/**
 * Initialize global tracker instance
 * @param options - Configuration options
 * @returns Tracker instance
 */
export function init(options: TrackerOptions = {}): TrackingAPI {
  // Support for direct API configuration (for JavaScript environments)
  const mergedOptions: TrackerOptions = {
    ...options,
    // Use provided apiKey or trackingApiKey first, then fallback to env
    apiKey:
      options.apiKey ||
      options.trackingApiKey ||
      (typeof process !== "undefined" && process.env
        ? process.env.NEXT_PUBLIC_TRACKING_API_KEY
        : undefined),
    // Use provided baseUrl or apiUrl first, then fallback to env
    baseUrl:
      options.baseUrl ||
      options.apiUrl ||
      (typeof process !== "undefined" && process.env
        ? process.env.NEXT_PUBLIC_API_URL
        : undefined),
  };

  globalTracker = new TrackingAPI(mergedOptions);
  return globalTracker;
}

/**
 * Get global tracker instance
 * @returns Global tracker instance
 */
export function getTracker(): TrackingAPI | null {
  if (!globalTracker) {
    // Auto-initialize with environment variables if available
    const defaultApiKey =
      typeof process !== "undefined" && process.env
        ? process.env.NEXT_PUBLIC_TRACKING_API_KEY
        : undefined;
    const defaultApiUrl =
      typeof process !== "undefined" && process.env
        ? process.env.NEXT_PUBLIC_API_URL
        : undefined;

    globalTracker = new TrackingAPI({
      apiKey: defaultApiKey,
      baseUrl: defaultApiUrl,
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

// Convenience functions using global tracker for quick tracking

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
// Dựa theo TrackerEnum.EventType để tạo các hàm tracking cụ thể

/**
 * Track page view event - TrackerEnum.EventType.pageview
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
 * Track click event - TrackerEnum.EventType.click
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
    visitor_id: eventData.visitor_id || "", // Will be handled by tracking-client
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track input event - TrackerEnum.EventType.input
 */
export async function trackInput(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.input,
    event_name: eventData.event_name || TrackerEnum.EventName.form_input_change,
    visitor_id: eventData.visitor_id || "", // Will be handled by tracking-client
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track submit event - TrackerEnum.EventType.submit
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
    visitor_id: eventData.visitor_id || "", // Will be handled by tracking-client
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track scroll event - TrackerEnum.EventType.scroll
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
    visitor_id: eventData.visitor_id || "", // Will be handled by tracking-client
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track hover event - TrackerEnum.EventType.hover
 */
export async function trackHover(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.hover,
    event_name: eventData.event_name || "Element Hover",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track change event - TrackerEnum.EventType.change
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
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track focus event - TrackerEnum.EventType.focus
 */
export async function trackFocus(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.focus,
    event_name: eventData.event_name || "Element Focus",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track blur event - TrackerEnum.EventType.blur
 */
export async function trackBlur(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.blur,
    event_name: eventData.event_name || "Element Blur",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track keydown event - TrackerEnum.EventType.keydown
 */
export async function trackKeydown(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.keydown,
    event_name: eventData.event_name || "Key Press",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track keyup event - TrackerEnum.EventType.keyup
 */
export async function trackKeyup(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.keyup,
    event_name: eventData.event_name || "Key Release",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track mouseenter event - TrackerEnum.EventType.mouseenter
 */
export async function trackMouseenter(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.mouseenter,
    event_name: eventData.event_name || "Mouse Enter",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track mouseleave event - TrackerEnum.EventType.mouseleave
 */
export async function trackMouseleave(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.mouseleave,
    event_name: eventData.event_name || "Mouse Leave",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

/**
 * Track zoom event - TrackerEnum.EventType.zoom
 */
export async function trackZoom(
  eventData: Partial<EventData> & {
    page_url: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;

  const fullEventData: EventData = {
    event_type: TrackerEnum.EventType.zoom,
    event_name: eventData.event_name || "Page Zoom",
    event_date: eventData.event_date || new Date().toISOString().split("T")[0],
    event_time: eventData.event_time || new Date().toISOString(),
    visitor_id: "", // Will be handled by tracking-client
    ...eventData,
  };

  return await tracker.track(fullEventData);
}

// ===== BUSINESS SPECIFIC EVENT FUNCTIONS =====
// Các hàm tracking cho business events cụ thể

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
 * Track remove from cart action
 */
export async function trackRemoveFromCart(
  eventData: Partial<EventData> & {
    page_url: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  return await trackClick({
    ...eventData,
    event_name: TrackerEnum.EventName.remove_from_cart,
    element_text: eventData.element_text || TrackerEnum.ElementText.remove,
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
 * Track contact form submission
 */
export async function trackContactFormSubmit(
  eventData: Partial<EventData> & {
    page_url: string;
  }
): Promise<TrackingResponse | null> {
  return await trackSubmit({
    ...eventData,
    event_name: TrackerEnum.EventName.contact_form_submit,
    element_selector:
      eventData.element_selector || TrackerEnum.ElementSelector.contact_form,
  });
}

/**
 * Track newsletter subscription
 */
export async function trackNewsletterSubscribe(
  eventData: Partial<EventData> & {
    page_url: string;
  }
): Promise<TrackingResponse | null> {
  return await trackSubmit({
    ...eventData,
    event_name: TrackerEnum.EventName.newsletter_subscribe,
  });
}

/**
 * Track modal open
 */
export async function trackOpenModal(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  return await trackClick({
    ...eventData,
    event_name: TrackerEnum.EventName.open_modal,
  });
}

/**
 * Track modal close
 */
export async function trackCloseModal(
  eventData: Partial<EventData> & {
    page_url: string;
  }
): Promise<TrackingResponse | null> {
  return await trackClick({
    ...eventData,
    event_name: TrackerEnum.EventName.close_modal,
    element_selector:
      eventData.element_selector || TrackerEnum.ElementSelector.modal_close,
  });
}

/**
 * Track product view
 */
export async function trackViewProduct(
  eventData: Partial<EventData> & {
    page_url: string;
    properties?: Record<string, string>;
  }
): Promise<TrackingResponse | null> {
  return await trackPageView({
    ...eventData,
    event_name: TrackerEnum.EventName.view_product,
    page_title: eventData.page_title || TrackerEnum.PageTitle.product_detail,
  });
}

/**
 * Track link click
 */
export async function trackLinkClick(
  eventData: Partial<EventData> & {
    page_url: string;
    element_selector?: string;
  }
): Promise<TrackingResponse | null> {
  return await trackClick({
    ...eventData,
    event_name: TrackerEnum.EventName.link_click,
    element_selector:
      eventData.element_selector || TrackerEnum.ElementSelector.profile_link,
  });
}

/**
 * Track copy link action
 */
export async function trackCopyLink(
  eventData: Partial<EventData> & {
    page_url: string;
  }
): Promise<TrackingResponse | null> {
  return await trackClick({
    ...eventData,
    event_name: TrackerEnum.EventName.copy_link,
  });
}

// ===== BACKWARD COMPATIBILITY =====
// Các hàm cũ cho backward compatibility

/**
 * Track custom event using global tracker (Deprecated - use specific event functions above)
 * @deprecated Use specific event type functions instead
 */
export async function trackCustomEvent(
  eventType: string,
  pageUrl: string,
  sessionId?: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse | null> {
  const tracker = getTracker();
  if (!tracker) return null;
  return await tracker.trackCustomEvent(
    eventType,
    pageUrl,
    sessionId,
    metadata
  );
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
export { TrackingAPI } from "./tracking-api";
export { CustomerClient } from "./customer-client";
export { WebsiteClient } from "./website-client";
export { APIKeyClient } from "./apikey-client";
export { TrackingClient } from "./tracking-client";
export { UserClient } from "./user-client";
export { AnalyticsClient } from "./analytics-client";
export { TrackerEnum } from "./tracker.enum";
export { EventData, TrackingResponse, TrackerOptions } from "./types";

// Export all types
export * from "./types";

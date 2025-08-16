
// Tracker API - Browser Version
(function(global) {
  'use strict';
  
  // Replace CommonJS exports with browser globals
  var exports = {};
  var module = { exports: exports };
  
  // Include the compiled code
  "use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerEnum = exports.AnalyticsClient = exports.UserClient = exports.TrackingClient = exports.APIKeyClient = exports.WebsiteClient = exports.CustomerClient = exports.TrackingAPI = void 0;
exports.init = init;
exports.getTracker = getTracker;
exports.createTracker = createTracker;
exports.track = track;
exports.trackBatch = trackBatch;
exports.trackPageView = trackPageView;
exports.trackClick = trackClick;
exports.trackInput = trackInput;
exports.trackSubmit = trackSubmit;
exports.trackScroll = trackScroll;
exports.trackHover = trackHover;
exports.trackChange = trackChange;
exports.trackFocus = trackFocus;
exports.trackBlur = trackBlur;
exports.trackKeydown = trackKeydown;
exports.trackKeyup = trackKeyup;
exports.trackMouseenter = trackMouseenter;
exports.trackMouseleave = trackMouseleave;
exports.trackZoom = trackZoom;
exports.trackLoginFormSubmit = trackLoginFormSubmit;
exports.trackSignupFormSubmit = trackSignupFormSubmit;
exports.trackSearchQuerySubmit = trackSearchQuerySubmit;
exports.trackAddToCart = trackAddToCart;
exports.trackRemoveFromCart = trackRemoveFromCart;
exports.trackPurchase = trackPurchase;
exports.trackContactFormSubmit = trackContactFormSubmit;
exports.trackNewsletterSubscribe = trackNewsletterSubscribe;
exports.trackOpenModal = trackOpenModal;
exports.trackCloseModal = trackCloseModal;
exports.trackViewProduct = trackViewProduct;
exports.trackLinkClick = trackLinkClick;
exports.trackCopyLink = trackCopyLink;
exports.trackCustomEvent = trackCustomEvent;
exports.flush = flush;
// index.ts - Main entry point for the tracking library
const tracking_api_1 = require("./tracking-api");
const tracker_enum_1 = require("./tracker.enum");
// Singleton instance for global usage
let globalTracker = null;
/**
 * Initialize global tracker instance
 * @param options - Configuration options
 * @returns Tracker instance
 */
function init(options = {}) {
    // Support for direct API configuration (for JavaScript environments)
    const mergedOptions = {
        ...options,
        // Use provided apiKey or trackingApiKey first, then fallback to env
        apiKey: options.apiKey ||
            options.trackingApiKey ||
            (typeof process !== "undefined" && process.env
                ? process.env.NEXT_PUBLIC_TRACKING_API_KEY
                : undefined),
        // Use provided baseUrl or apiUrl first, then fallback to env
        baseUrl: options.baseUrl ||
            options.apiUrl ||
            (typeof process !== "undefined" && process.env
                ? process.env.NEXT_PUBLIC_API_URL
                : undefined),
    };
    globalTracker = new tracking_api_1.TrackingAPI(mergedOptions);
    return globalTracker;
}
/**
 * Get global tracker instance
 * @returns Global tracker instance
 */
function getTracker() {
    if (!globalTracker) {
        // Auto-initialize with environment variables if available
        const defaultApiKey = typeof process !== "undefined" && process.env
            ? process.env.NEXT_PUBLIC_TRACKING_API_KEY
            : undefined;
        const defaultApiUrl = typeof process !== "undefined" && process.env
            ? process.env.NEXT_PUBLIC_API_URL
            : undefined;
        globalTracker = new tracking_api_1.TrackingAPI({
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
function createTracker(options = {}) {
    return new tracking_api_1.TrackingAPI(options);
}
// Convenience functions using global tracker for quick tracking
/**
 * Track a custom event using global tracker
 */
async function track(eventData, immediate = false) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    return await tracker.track(eventData, immediate);
}
/**
 * Track multiple events at once using global tracker
 */
async function trackBatch(events) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    return await tracker.trackBatch(events);
}
// ===== EVENT TYPE SPECIFIC TRACKING FUNCTIONS =====
// Dựa theo TrackerEnum.EventType để tạo các hàm tracking cụ thể
/**
 * Track page view event - TrackerEnum.EventType.pageview
 */
async function trackPageView(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.pageview,
        event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.view_product,
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
async function trackClick(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.click,
        event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.button_click,
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
async function trackInput(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.input,
        event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.form_input_change,
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
async function trackSubmit(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.submit,
        event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.contact_form_submit,
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
async function trackScroll(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.scroll,
        event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.scroll_to_bottom,
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
async function trackHover(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.hover,
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
async function trackChange(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.change,
        event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.form_input_change,
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
async function trackFocus(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.focus,
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
async function trackBlur(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.blur,
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
async function trackKeydown(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.keydown,
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
async function trackKeyup(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.keyup,
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
async function trackMouseenter(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.mouseenter,
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
async function trackMouseleave(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.mouseleave,
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
async function trackZoom(eventData) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    const fullEventData = {
        event_type: tracker_enum_1.TrackerEnum.EventType.zoom,
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
async function trackLoginFormSubmit(eventData) {
    return await trackSubmit({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.login_form_submit,
        element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.login_button,
        element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.login,
    });
}
/**
 * Track signup form submission
 */
async function trackSignupFormSubmit(eventData) {
    return await trackSubmit({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.signup_form_submit,
        element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.signup_button,
        element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.signup,
    });
}
/**
 * Track search query submission
 */
async function trackSearchQuerySubmit(eventData) {
    return await trackSubmit({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.search_query_submit,
        element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.search_input,
        element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.search,
    });
}
/**
 * Track add to cart action
 */
async function trackAddToCart(eventData) {
    return await trackClick({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.add_to_cart,
        element_selector: eventData.element_selector ||
            tracker_enum_1.TrackerEnum.ElementSelector.add_to_cart_button,
        element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.add_to_cart,
    });
}
/**
 * Track remove from cart action
 */
async function trackRemoveFromCart(eventData) {
    return await trackClick({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.remove_from_cart,
        element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.remove,
    });
}
/**
 * Track purchase event
 */
async function trackPurchase(eventData) {
    return await trackSubmit({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.purchase,
    });
}
/**
 * Track contact form submission
 */
async function trackContactFormSubmit(eventData) {
    return await trackSubmit({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.contact_form_submit,
        element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.contact_form,
    });
}
/**
 * Track newsletter subscription
 */
async function trackNewsletterSubscribe(eventData) {
    return await trackSubmit({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.newsletter_subscribe,
    });
}
/**
 * Track modal open
 */
async function trackOpenModal(eventData) {
    return await trackClick({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.open_modal,
    });
}
/**
 * Track modal close
 */
async function trackCloseModal(eventData) {
    return await trackClick({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.close_modal,
        element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.modal_close,
    });
}
/**
 * Track product view
 */
async function trackViewProduct(eventData) {
    return await trackPageView({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.view_product,
        page_title: eventData.page_title || tracker_enum_1.TrackerEnum.PageTitle.product_detail,
    });
}
/**
 * Track link click
 */
async function trackLinkClick(eventData) {
    return await trackClick({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.link_click,
        element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.profile_link,
    });
}
/**
 * Track copy link action
 */
async function trackCopyLink(eventData) {
    return await trackClick({
        ...eventData,
        event_name: tracker_enum_1.TrackerEnum.EventName.copy_link,
    });
}
// ===== BACKWARD COMPATIBILITY =====
// Các hàm cũ cho backward compatibility
/**
 * Track custom event using global tracker (Deprecated - use specific event functions above)
 * @deprecated Use specific event type functions instead
 */
async function trackCustomEvent(eventType, pageUrl, sessionId, metadata) {
    const tracker = getTracker();
    if (!tracker)
        return null;
    return await tracker.trackCustomEvent(eventType, pageUrl, sessionId, metadata);
}
/**
 * Flush pending events using global tracker
 */
async function flush() {
    const tracker = getTracker();
    if (!tracker)
        return null;
    return await tracker.flush();
}
// Export main classes and types
var tracking_api_2 = require("./tracking-api");
Object.defineProperty(exports, "TrackingAPI", { enumerable: true, get: function () { return tracking_api_2.TrackingAPI; } });
var customer_client_1 = require("./customer-client");
Object.defineProperty(exports, "CustomerClient", { enumerable: true, get: function () { return customer_client_1.CustomerClient; } });
var website_client_1 = require("./website-client");
Object.defineProperty(exports, "WebsiteClient", { enumerable: true, get: function () { return website_client_1.WebsiteClient; } });
var apikey_client_1 = require("./apikey-client");
Object.defineProperty(exports, "APIKeyClient", { enumerable: true, get: function () { return apikey_client_1.APIKeyClient; } });
var tracking_client_1 = require("./tracking-client");
Object.defineProperty(exports, "TrackingClient", { enumerable: true, get: function () { return tracking_client_1.TrackingClient; } });
var user_client_1 = require("./user-client");
Object.defineProperty(exports, "UserClient", { enumerable: true, get: function () { return user_client_1.UserClient; } });
var analytics_client_1 = require("./analytics-client");
Object.defineProperty(exports, "AnalyticsClient", { enumerable: true, get: function () { return analytics_client_1.AnalyticsClient; } });
var tracker_enum_2 = require("./tracker.enum");
Object.defineProperty(exports, "TrackerEnum", { enumerable: true, get: function () { return tracker_enum_2.TrackerEnum; } });
// Export all types
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map
  
  // Make it available globally
  global.TrackerAPI = module.exports;
  
  // Also make individual functions available
  if (module.exports) {
    Object.keys(module.exports).forEach(function(key) {
      global.TrackerAPI[key] = module.exports[key];
    });
  }
  
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);

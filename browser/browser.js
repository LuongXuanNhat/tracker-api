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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tracking-api", "./tracker.enum", "./tracking-api", "./tracker.enum", "./types"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrackerEnum = exports.TrackingAPI = void 0;
    exports.init = init;
    exports.getTracker = getTracker;
    exports.createTracker = createTracker;
    exports.track = track;
    exports.trackBatch = trackBatch;
    exports.trackPageView = trackPageView;
    exports.trackClick = trackClick;
    exports.trackSubmit = trackSubmit;
    exports.trackScroll = trackScroll;
    exports.trackChange = trackChange;
    exports.trackAddToCart = trackAddToCart;
    exports.trackPurchase = trackPurchase;
    exports.trackLoginFormSubmit = trackLoginFormSubmit;
    exports.trackSignupFormSubmit = trackSignupFormSubmit;
    exports.trackSearchQuerySubmit = trackSearchQuerySubmit;
    exports.flush = flush;
    const tracking_api_1 = require("./tracking-api");
    const tracker_enum_1 = require("./tracker.enum");
    let globalTracker = null;
    function init(options = {}) {
        if (!options.apiKey) {
            console.warn("TrackerAPI: apiKey is required for browser usage");
        }
        if (!options.baseUrl) {
            console.warn("TrackerAPI: baseUrl is required for browser usage");
        }
        globalTracker = new tracking_api_1.TrackingAPI(options);
        return globalTracker;
    }
    function getTracker() {
        if (!globalTracker) {
            console.warn("TrackerAPI: Please call init() first with apiKey and baseUrl");
            return null;
        }
        return globalTracker;
    }
    function createTracker(options = {}) {
        return new tracking_api_1.TrackingAPI(options);
    }
    async function track(eventData, immediate = false) {
        const tracker = getTracker();
        if (!tracker)
            return null;
        return await tracker.track(eventData, immediate);
    }
    async function trackBatch(events) {
        const tracker = getTracker();
        if (!tracker)
            return null;
        return await tracker.trackBatch(events);
    }
    async function trackPageView(eventData) {
        const tracker = getTracker();
        if (!tracker)
            return null;
        const fullEventData = {
            event_type: tracker_enum_1.TrackerEnum.EventType.pageview,
            event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.view_product,
            event_date: eventData.event_date || new Date().toISOString().split("T")[0],
            event_time: eventData.event_time || new Date().toISOString(),
            visitor_id: "",
            ...eventData,
        };
        return await tracker.track(fullEventData);
    }
    async function trackClick(eventData) {
        const tracker = getTracker();
        if (!tracker)
            return null;
        const fullEventData = {
            event_type: tracker_enum_1.TrackerEnum.EventType.click,
            event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.button_click,
            visitor_id: eventData.visitor_id || "",
            event_date: eventData.event_date || new Date().toISOString().split("T")[0],
            event_time: eventData.event_time || new Date().toISOString(),
            ...eventData,
        };
        return await tracker.track(fullEventData);
    }
    async function trackSubmit(eventData) {
        const tracker = getTracker();
        if (!tracker)
            return null;
        const fullEventData = {
            event_type: tracker_enum_1.TrackerEnum.EventType.submit,
            event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.contact_form_submit,
            visitor_id: eventData.visitor_id || "",
            event_date: eventData.event_date || new Date().toISOString().split("T")[0],
            event_time: eventData.event_time || new Date().toISOString(),
            ...eventData,
        };
        return await tracker.track(fullEventData);
    }
    async function trackScroll(eventData) {
        const tracker = getTracker();
        if (!tracker)
            return null;
        const fullEventData = {
            event_type: tracker_enum_1.TrackerEnum.EventType.scroll,
            event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.scroll_to_bottom,
            visitor_id: eventData.visitor_id || "",
            event_date: eventData.event_date || new Date().toISOString().split("T")[0],
            event_time: eventData.event_time || new Date().toISOString(),
            ...eventData,
        };
        return await tracker.track(fullEventData);
    }
    async function trackChange(eventData) {
        const tracker = getTracker();
        if (!tracker)
            return null;
        const fullEventData = {
            event_type: tracker_enum_1.TrackerEnum.EventType.change,
            event_name: eventData.event_name || tracker_enum_1.TrackerEnum.EventName.form_input_change,
            event_date: eventData.event_date || new Date().toISOString().split("T")[0],
            event_time: eventData.event_time || new Date().toISOString(),
            visitor_id: "",
            ...eventData,
        };
        return await tracker.track(fullEventData);
    }
    async function trackAddToCart(eventData) {
        return await trackClick({
            ...eventData,
            event_name: tracker_enum_1.TrackerEnum.EventName.add_to_cart,
            element_selector: eventData.element_selector ||
                tracker_enum_1.TrackerEnum.ElementSelector.add_to_cart_button,
            element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.add_to_cart,
        });
    }
    async function trackPurchase(eventData) {
        return await trackSubmit({
            ...eventData,
            event_name: tracker_enum_1.TrackerEnum.EventName.purchase,
        });
    }
    async function trackLoginFormSubmit(eventData) {
        return await trackSubmit({
            ...eventData,
            event_name: tracker_enum_1.TrackerEnum.EventName.login_form_submit,
            element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.login_button,
            element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.login,
        });
    }
    async function trackSignupFormSubmit(eventData) {
        return await trackSubmit({
            ...eventData,
            event_name: tracker_enum_1.TrackerEnum.EventName.signup_form_submit,
            element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.signup_button,
            element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.signup,
        });
    }
    async function trackSearchQuerySubmit(eventData) {
        return await trackSubmit({
            ...eventData,
            event_name: tracker_enum_1.TrackerEnum.EventName.search_query_submit,
            element_selector: eventData.element_selector || tracker_enum_1.TrackerEnum.ElementSelector.search_input,
            element_text: eventData.element_text || tracker_enum_1.TrackerEnum.ElementText.search,
        });
    }
    async function flush() {
        const tracker = getTracker();
        if (!tracker)
            return null;
        return await tracker.flush();
    }
    var tracking_api_2 = require("./tracking-api");
    Object.defineProperty(exports, "TrackingAPI", { enumerable: true, get: function () { return tracking_api_2.TrackingAPI; } });
    var tracker_enum_2 = require("./tracker.enum");
    Object.defineProperty(exports, "TrackerEnum", { enumerable: true, get: function () { return tracker_enum_2.TrackerEnum; } });
    __exportStar(require("./types"), exports);
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./customer-client", "./website-client", "./apikey-client", "./tracking-client", "./user-client", "./analytics-client", "./customer-client", "./website-client", "./apikey-client", "./tracking-client", "./user-client", "./analytics-client", "./tracker.enum"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrackerEnum = exports.AnalyticsClient = exports.UserClient = exports.TrackingClient = exports.APIKeyClient = exports.WebsiteClient = exports.CustomerClient = exports.TrackingAPI = void 0;
    const customer_client_1 = require("./customer-client");
    const website_client_1 = require("./website-client");
    const apikey_client_1 = require("./apikey-client");
    const tracking_client_1 = require("./tracking-client");
    const user_client_1 = require("./user-client");
    const analytics_client_1 = require("./analytics-client");
    class TrackingAPI {
        constructor(options = {}) {
            this.token = null;
            this.customers = new customer_client_1.CustomerClient(options);
            this.websites = new website_client_1.WebsiteClient(options);
            this.apiKeys = new apikey_client_1.APIKeyClient(options);
            this.tracking = new tracking_client_1.TrackingClient(options);
            this.users = new user_client_1.UserClient(options);
            this.analytics = new analytics_client_1.AnalyticsClient(options);
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
        async track(eventData, immediate) {
            return this.tracking.trackEvent(eventData, immediate);
        }
        async trackBatch(events) {
            return this.tracking.trackBatch(events);
        }
        async trackPageView(pageUrl, sessionId, metadata) {
            return this.tracking.trackPageView(pageUrl, sessionId, metadata);
        }
        async trackClick(elementType, pageUrl, elementId, sessionId, metadata) {
            return this.tracking.trackClick(elementType, pageUrl, elementId, sessionId, metadata);
        }
        async trackScroll(pageUrl, scrollPercentage, sessionId, metadata) {
            return this.tracking.trackScroll(pageUrl, scrollPercentage, sessionId, metadata);
        }
        async trackCustomEvent(eventType, pageUrl, sessionId, metadata) {
            return this.tracking.trackCustomEvent(eventType, pageUrl, sessionId, metadata);
        }
        async flush() {
            return this.tracking.flush();
        }
    }
    exports.TrackingAPI = TrackingAPI;
    var customer_client_2 = require("./customer-client");
    Object.defineProperty(exports, "CustomerClient", { enumerable: true, get: function () { return customer_client_2.CustomerClient; } });
    var website_client_2 = require("./website-client");
    Object.defineProperty(exports, "WebsiteClient", { enumerable: true, get: function () { return website_client_2.WebsiteClient; } });
    var apikey_client_2 = require("./apikey-client");
    Object.defineProperty(exports, "APIKeyClient", { enumerable: true, get: function () { return apikey_client_2.APIKeyClient; } });
    var tracking_client_2 = require("./tracking-client");
    Object.defineProperty(exports, "TrackingClient", { enumerable: true, get: function () { return tracking_client_2.TrackingClient; } });
    var user_client_2 = require("./user-client");
    Object.defineProperty(exports, "UserClient", { enumerable: true, get: function () { return user_client_2.UserClient; } });
    var analytics_client_2 = require("./analytics-client");
    Object.defineProperty(exports, "AnalyticsClient", { enumerable: true, get: function () { return analytics_client_2.AnalyticsClient; } });
    var tracker_enum_1 = require("./tracker.enum");
    Object.defineProperty(exports, "TrackerEnum", { enumerable: true, get: function () { return tracker_enum_1.TrackerEnum; } });
});

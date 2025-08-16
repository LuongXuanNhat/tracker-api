(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./base-client"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnalyticsClient = void 0;
    const base_client_1 = require("./base-client");
    class AnalyticsClient extends base_client_1.BaseClient {
        async getRealtime(token, websiteId) {
            return this.get(`/api/analytics/realtime/${websiteId}`, token);
        }
        async getHistoricalReports(token, websiteId, query) {
            const params = new URLSearchParams();
            params.append('startDate', query.startDate);
            params.append('endDate', query.endDate);
            if (query.metrics)
                params.append('metrics', query.metrics);
            return this.get(`/api/analytics/reports/${websiteId}?${params.toString()}`, token);
        }
        async getUserJourney(token, userId) {
            return this.get(`/api/analytics/user-journey/${userId}`, token);
        }
        async getPageAnalytics(token, websiteId, query) {
            const params = new URLSearchParams();
            params.append('startDate', query.startDate);
            params.append('endDate', query.endDate);
            return this.get(`/api/analytics/pages/${websiteId}?${params.toString()}`, token);
        }
        async getEventAnalytics(token, websiteId, query) {
            const params = new URLSearchParams();
            params.append('startDate', query.startDate);
            params.append('endDate', query.endDate);
            if (query.eventType)
                params.append('eventType', query.eventType);
            return this.get(`/api/analytics/events/${websiteId}?${params.toString()}`, token);
        }
    }
    exports.AnalyticsClient = AnalyticsClient;
});

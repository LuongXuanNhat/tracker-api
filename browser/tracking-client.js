(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./base-client", "uuid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrackingClient = void 0;
    const base_client_1 = require("./base-client");
    const uuid_1 = require("uuid");
    class TrackingClient extends base_client_1.BaseClient {
        constructor(options = {}) {
            super(options);
            this.eventQueue = [];
            this.batchTimer = null;
            this.visitorId = null;
            this.batchSize = options.batchSize || 10;
            this.batchTimeout = options.batchTimeout || 2000;
            if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
                this.visitorId = localStorage.getItem("tracker_api:visitor_id");
                if (!this.visitorId) {
                    this.visitorId = (0, uuid_1.v4)();
                    localStorage.setItem("tracker_api:visitor_id", this.visitorId);
                }
            }
            else {
                console.warn("Running in non-browser environment, using temporary visitor ID");
                this.visitorId = (0, uuid_1.v4)();
            }
            if (typeof window !== "undefined") {
                window.addEventListener("beforeunload", () => {
                    this.flush();
                });
                setInterval(() => {
                    if (this.eventQueue.length > 0) {
                        this.flush();
                    }
                }, 10000);
            }
        }
        async trackEvent(eventData, immediate = false) {
            if (!eventData.event_type) {
                throw new Error("event_type is required");
            }
            if (!eventData.event_name) {
                throw new Error("event_name is required");
            }
            if (!eventData.page_url) {
                throw new Error("page_url is required");
            }
            if (!eventData.visitor_id) {
                eventData.visitor_id = this.visitorId || (0, uuid_1.v4)();
            }
            if (!eventData.visitor_id && this.visitorId) {
                eventData.visitor_id = this.visitorId;
            }
            if (!eventData.event_id) {
                eventData.event_id = (0, uuid_1.v4)();
            }
            if (!eventData.event_date) {
                const now = new Date();
                eventData.event_date = now.toISOString().split("T")[0];
            }
            if (!eventData.event_time) {
                eventData.event_time = new Date().toISOString();
            }
            const event = {
                ...eventData,
                timestamp: eventData.timestamp || Date.now(),
            };
            if (immediate) {
                return this.post("/api/tracking/events", event);
            }
            this.eventQueue.push(event);
            if (this.eventQueue.length >= this.batchSize) {
                return this.flush();
            }
            if (!this.batchTimer) {
                this.batchTimer = setTimeout(() => this.flush(), this.batchTimeout);
            }
            return { success: true, message: "Event queued for batch processing" };
        }
        async trackBatch(events) {
            const processedEvents = events.map((event) => {
                if (!event.event_type) {
                    throw new Error("event_type is required for all events");
                }
                if (!event.event_name) {
                    throw new Error("event_name is required for all events");
                }
                if (!event.page_url) {
                    throw new Error("page_url is required for all events");
                }
                if (!event.visitor_id) {
                    throw new Error("visitor_id is required for all events");
                }
                if (!event.event_id) {
                    event.event_id = (0, uuid_1.v4)();
                }
                if (!event.event_date) {
                    const now = new Date();
                    event.event_date = now.toISOString().split("T")[0];
                }
                if (!event.event_time) {
                    event.event_time = new Date().toISOString();
                }
                return {
                    ...event,
                    timestamp: event.timestamp || Date.now(),
                };
            });
            return this.post("/api/tracking/events/batch", {
                events: processedEvents,
            });
        }
        async flush() {
            if (this.batchTimer) {
                clearTimeout(this.batchTimer);
                this.batchTimer = null;
            }
            if (this.eventQueue.length === 0) {
                return { success: true, message: "No events to flush" };
            }
            const events = [...this.eventQueue];
            this.eventQueue = [];
            return this.trackBatch(events);
        }
        async healthCheck() {
            return this.get("/api/tracking/health");
        }
        async getEvents(token, query) {
            const params = new URLSearchParams();
            Object.entries(query).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.append(key, String(value));
                }
            });
            return this.get(`/api/tracking/events?${params.toString()}`, token);
        }
        async getEventsByUser(token, userId) {
            return this.get(`/api/tracking/events/user/${userId}`, token);
        }
        async getEventsBySession(token, sessionId) {
            return this.get(`/api/tracking/events/session/${sessionId}`, token);
        }
        async getDailyStats(token, date, websiteId) {
            const params = websiteId ? `?websiteId=${websiteId}` : "";
            return this.get(`/api/tracking/stats/daily/${date}${params}`, token);
        }
        async getTopPages(token, websiteId, limit = 10) {
            const params = new URLSearchParams();
            if (websiteId)
                params.append("websiteId", websiteId);
            if (limit)
                params.append("limit", String(limit));
            return this.get(`/api/tracking/stats/top-pages?${params.toString()}`, token);
        }
        async trackPageView(pageUrl, sessionId, metadata) {
            return this.trackEvent({
                event_type: "pageview",
                event_name: "page_view",
                page_url: pageUrl,
                visitor_id: this.visitorId || (0, uuid_1.v4)(),
                user_id: this.visitorId || (0, uuid_1.v4)(),
                session_id: sessionId,
                metadata,
            });
        }
        async trackClick(elementType, pageUrl, elementId, sessionId, metadata) {
            return this.trackEvent({
                event_type: "click",
                event_name: `${elementType}_click`,
                page_url: pageUrl,
                visitor_id: this.visitorId || (0, uuid_1.v4)(),
                user_id: this.visitorId || (0, uuid_1.v4)(),
                session_id: sessionId,
                element_type: elementType,
                element_id: elementId,
                metadata,
            });
        }
        async trackScroll(pageUrl, scrollPercentage, sessionId, metadata) {
            return this.trackEvent({
                event_type: "scroll",
                event_name: "page_scroll",
                page_url: pageUrl,
                visitor_id: this.visitorId || (0, uuid_1.v4)(),
                user_id: this.visitorId || (0, uuid_1.v4)(),
                session_id: sessionId,
                properties: {
                    scroll_percentage: scrollPercentage.toString(),
                },
                metadata: {
                    ...metadata,
                    scrollPercentage,
                },
            });
        }
        async trackCustomEvent(eventType, pageUrl, sessionId, metadata) {
            return this.trackEvent({
                event_type: eventType,
                event_name: eventType,
                page_url: pageUrl,
                visitor_id: this.visitorId || (0, uuid_1.v4)(),
                user_id: this.visitorId || (0, uuid_1.v4)(),
                session_id: sessionId,
                metadata,
            });
        }
    }
    exports.TrackingClient = TrackingClient;
});

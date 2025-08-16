
// Tracker API - Browser Bundle
(function(global) {
  'use strict';
  
  // Create a module system for browser
  var exports = {};
  var modules = {};
  var require = function(name) {
    return modules[name] || {};
  };


  // types.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    // types.ts - Complete type definitions for User Behavior Tracking API
//# sourceMappingURL=types.js.map
    
    modules['types'] = module.exports;
  })();

  // tracker.enum.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.TrackerEnum = void 0;
var TrackerEnum;
(function (TrackerEnum) {
    let EventType;
    (function (EventType) {
        EventType["click"] = "click";
        EventType["input"] = "input";
        EventType["submit"] = "submit";
        EventType["pageview"] = "pageview";
        EventType["scroll"] = "scroll";
        EventType["hover"] = "hover";
        EventType["change"] = "change";
        EventType["focus"] = "focus";
        EventType["blur"] = "blur";
        EventType["keydown"] = "keydown";
        EventType["keyup"] = "keyup";
        EventType["mouseenter"] = "mouseenter";
        EventType["mouseleave"] = "mouseleave";
        EventType["zoom"] = "zoom";
    })(EventType = TrackerEnum.EventType || (TrackerEnum.EventType = {}));
    let EventName;
    (function (EventName) {
        EventName["login_form_submit"] = "Nh\u1EADp form \u0111\u0103ng nh\u1EADp";
        EventName["signup_form_submit"] = "Nh\u1EADp form \u0111\u0103ng k\u00FD";
        EventName["search_query_submit"] = "T\u00ECm ki\u1EBFm";
        EventName["newsletter_subscribe"] = "\u0110\u0103ng k\u00FD nh\u1EADn b\u1EA3n tin";
        EventName["add_to_cart"] = "Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng";
        EventName["remove_from_cart"] = "X\u00F3a kh\u1ECFi gi\u1ECF h\u00E0ng";
        EventName["purchase"] = "Mua h\u00E0ng";
        EventName["contact_form_submit"] = "G\u1EEDi form li\u00EAn h\u1EC7";
        EventName["form_input_change"] = "Thay \u0111\u1ED5i tr\u01B0\u1EDDng nh\u1EADp li\u1EC7u";
        EventName["scroll_to_bottom"] = "Cu\u1ED9n \u0111\u1EBFn cu\u1ED1i trang";
        EventName["open_modal"] = "M\u1EDF modal";
        EventName["close_modal"] = "\u0110\u00F3ng modal";
        EventName["view_product"] = "Xem s\u1EA3n ph\u1EA9m";
        EventName["button_click"] = "Nh\u1EA5n n\u00FAt";
        EventName["link_click"] = "Nh\u1EA5n v\u00E0o li\u00EAn k\u1EBFt";
        EventName["copy_link"] = "Sao ch\u00E9p li\u00EAn k\u1EBFt";
    })(EventName = TrackerEnum.EventName || (TrackerEnum.EventName = {}));
    let PageTitle;
    (function (PageTitle) {
        PageTitle["home"] = "Trang ch\u1EE7";
        PageTitle["login"] = "\u0110\u0103ng nh\u1EADp";
        PageTitle["signup"] = "\u0110\u0103ng k\u00FD";
        PageTitle["cart"] = "Gi\u1ECF h\u00E0ng";
        PageTitle["checkout"] = "Thanh to\u00E1n";
        PageTitle["dashboard"] = "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n";
        PageTitle["profile"] = "Trang c\u00E1 nh\u00E2n";
        PageTitle["product_detail"] = "Chi ti\u1EBFt s\u1EA3n ph\u1EA9m";
        PageTitle["search_results"] = "K\u1EBFt qu\u1EA3 t\u00ECm ki\u1EBFm";
        PageTitle["contact"] = "Li\u00EAn h\u1EC7";
        PageTitle["service"] = "D\u1ECBch v\u1EE5";
        PageTitle["about"] = "Gi\u1EDBi thi\u1EC7u";
        PageTitle["terms"] = "\u0110i\u1EC1u kho\u1EA3n s\u1EED d\u1EE5ng";
        PageTitle["privacy"] = "Ch\u00EDnh s\u00E1ch b\u1EA3o m\u1EADt";
        PageTitle["faq"] = "C\u00E2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p";
        PageTitle["review"] = "\u0110\u00E1nh gi\u00E1";
        PageTitle["detail"] = "Chi ti\u1EBFt";
        PageTitle["settings"] = "C\u00E0i \u0111\u1EB7t";
    })(PageTitle = TrackerEnum.PageTitle || (TrackerEnum.PageTitle = {}));
    let ElementSelector;
    (function (ElementSelector) {
        ElementSelector["login_button"] = "#login-btn";
        ElementSelector["signup_button"] = "#signup-btn";
        ElementSelector["cart_button"] = "#cart-btn";
        ElementSelector["submit_button"] = "#submit-btn";
        ElementSelector["search_input"] = "#search-box";
        ElementSelector["add_to_cart_button"] = ".add-to-cart";
        ElementSelector["contact_form"] = "#contact-form";
        ElementSelector["modal_close"] = ".modal .close";
        ElementSelector["profile_link"] = "a.profile";
    })(ElementSelector = TrackerEnum.ElementSelector || (TrackerEnum.ElementSelector = {}));
    let ElementText;
    (function (ElementText) {
        ElementText["login"] = "\u0110\u0103ng nh\u1EADp";
        ElementText["signup"] = "\u0110\u0103ng k\u00FD";
        ElementText["add_to_cart"] = "Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng";
        ElementText["remove"] = "X\u00F3a";
        ElementText["submit"] = "G\u1EEDi";
        ElementText["search"] = "T\u00ECm ki\u1EBFm";
        ElementText["continue"] = "Ti\u1EBFp t\u1EE5c";
        ElementText["cancel"] = "H\u1EE7y";
        ElementText["contact_us"] = "Li\u00EAn h\u1EC7";
    })(ElementText = TrackerEnum.ElementText || (TrackerEnum.ElementText = {}));
    let DeviceType;
    (function (DeviceType) {
        DeviceType["desktop"] = "desktop";
        DeviceType["mobile"] = "mobile";
        DeviceType["tablet"] = "tablet";
        DeviceType["smart_tv"] = "smart_tv";
        DeviceType["console"] = "console";
        DeviceType["wearable"] = "wearable";
    })(DeviceType = TrackerEnum.DeviceType || (TrackerEnum.DeviceType = {}));
})(TrackerEnum || (exports.TrackerEnum = TrackerEnum = {}));
//# sourceMappingURL=tracker.enum.js.map
    
    modules['tracker.enum'] = module.exports;
  })();

  // base-client.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.BaseClient = void 0;
class BaseClient {
    constructor(options = {}) {
        this.baseURL = options.baseUrl || this.getDefaultBaseURL();
        this.apiKey = options.apiKey || null;
        this.timeout = options.timeout || 5000;
        this.retryAttempts = options.retryAttempts || 3;
        this.retryDelay = options.retryDelay || 1000;
        this.debug = options.debug || false;
    }
    getDefaultBaseURL() {
        // Check for environment variables
        if (typeof process !== 'undefined' && process.env) {
            if (process.env.NODE_ENV === 'production') {
                return process.env.TRACKER_API_PROD_URL || 'https://api.yourdomain.com';
            }
            return process.env.TRACKER_API_DEV_URL || 'http://localhost:3002';
        }
        // Browser fallback
        if (typeof window !== 'undefined') {
            return window.location.origin.includes('localhost')
                ? 'http://localhost:3002'
                : 'https://api.yourdomain.com';
        }
        return 'http://localhost:3002';
    }
    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (includeAuth && this.apiKey) {
            headers['X-API-Key'] = this.apiKey;
        }
        return headers;
    }
    getAuthHeaders(token) {
        return {
            ...this.getHeaders(false),
            'Authorization': `Bearer ${token}`,
        };
    }
    async makeRequest(endpoint, options = {}, attempt = 1, token) {
        const url = `${this.baseURL}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        try {
            const headers = token
                ? this.getAuthHeaders(token)
                : this.getHeaders();
            if (this.debug) {
                console.log(`[TrackerAPI] ${options.method || 'GET'} ${url}`);
                if (options.body) {
                    console.log('[TrackerAPI] Request body:', options.body);
                }
            }
            const response = await fetch(url, {
                ...options,
                headers: { ...headers, ...options.headers },
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            const responseData = await response.json();
            if (this.debug) {
                console.log('[TrackerAPI] Response:', responseData);
            }
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${responseData.message || response.statusText}`);
            }
            return responseData;
        }
        catch (error) {
            clearTimeout(timeoutId);
            if (this.debug) {
                console.error('[TrackerAPI] Request failed:', error);
            }
            if (attempt < this.retryAttempts && !controller.signal.aborted) {
                await this.delay(this.retryDelay * attempt);
                return this.makeRequest(endpoint, options, attempt + 1, token);
            }
            throw error;
        }
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // Utility methods for common HTTP verbs
    async get(endpoint, token) {
        return this.makeRequest(endpoint, { method: 'GET' }, 1, token);
    }
    async post(endpoint, data, token) {
        return this.makeRequest(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, 1, token);
    }
    async put(endpoint, data, token) {
        return this.makeRequest(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        }, 1, token);
    }
    async delete(endpoint, token) {
        return this.makeRequest(endpoint, { method: 'DELETE' }, 1, token);
    }
}
exports.BaseClient = BaseClient;
//# sourceMappingURL=base-client.js.map
    
    modules['base-client'] = module.exports;
  })();

  // tracking-client.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.TrackingClient = void 0;
// tracking-client.ts - Event tracking API client
// base_client_1 imported// uuid_1 importedclass TrackingClient extends base_client_1.BaseClient {
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
            // fallback trên server, ví dụ dùng UUID tạm thời hoặc null
            console.warn("Running in non-browser environment, using temporary visitor ID");
            this.visitorId = (0, uuid_1.v4)(); // hoặc để null
        }
        // Auto-flush queue when page unloads (browser only)
        if (typeof window !== "undefined") {
            window.addEventListener("beforeunload", () => {
                this.flush();
            });
            // Periodic flush
            setInterval(() => {
                if (this.eventQueue.length > 0) {
                    this.flush();
                }
            }, 10000);
        }
    }
    /**
     * Track a single event
     */
    async trackEvent(eventData, immediate = false) {
        // Validate required fields
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
        // Set default visitor_id if not provided (for backward compatibility)
        if (!eventData.visitor_id && this.visitorId) {
            eventData.visitor_id = this.visitorId;
        }
        // Generate event_id if not provided
        if (!eventData.event_id) {
            eventData.event_id = (0, uuid_1.v4)();
        }
        // Set event_date if not provided
        if (!eventData.event_date) {
            const now = new Date();
            eventData.event_date = now.toISOString().split("T")[0]; // YYYY-MM-DD
        }
        // Set event_time if not provided
        if (!eventData.event_time) {
            eventData.event_time = new Date().toISOString();
        }
        const event = {
            ...eventData,
            timestamp: eventData.timestamp || Date.now(), // Keep for backward compatibility
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
    /**
     * Track multiple events at once
     */
    async trackBatch(events) {
        // Validate and enhance each event
        const processedEvents = events.map((event) => {
            // Validate required fields
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
            // Generate event_id if not provided
            if (!event.event_id) {
                event.event_id = (0, uuid_1.v4)();
            }
            // Set event_date if not provided
            if (!event.event_date) {
                const now = new Date();
                event.event_date = now.toISOString().split("T")[0]; // YYYY-MM-DD
            }
            // Set event_time if not provided
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
    /**
     * Flush the event queue
     */
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
    /**
     * Check tracking health
     */
    async healthCheck() {
        return this.get("/api/tracking/health");
    }
    /**
     * Get events by date range
     */
    async getEvents(token, query) {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined) {
                params.append(key, String(value));
            }
        });
        return this.get(`/api/tracking/events?${params.toString()}`, token);
    }
    /**
     * Get events by user
     */
    async getEventsByUser(token, userId) {
        return this.get(`/api/tracking/events/user/${userId}`, token);
    }
    /**
     * Get events by session
     */
    async getEventsBySession(token, sessionId) {
        return this.get(`/api/tracking/events/session/${sessionId}`, token);
    }
    /**
     * Get daily event statistics
     */
    async getDailyStats(token, date, websiteId) {
        const params = websiteId ? `?websiteId=${websiteId}` : "";
        return this.get(`/api/tracking/stats/daily/${date}${params}`, token);
    }
    /**
     * Get top pages
     */
    async getTopPages(token, websiteId, limit = 10) {
        const params = new URLSearchParams();
        if (websiteId)
            params.append("websiteId", websiteId);
        if (limit)
            params.append("limit", String(limit));
        return this.get(`/api/tracking/stats/top-pages?${params.toString()}`, token);
    }
    // Convenience methods for specific event types
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
//# sourceMappingURL=tracking-client.js.map
    
    modules['tracking-client'] = module.exports;
  })();

  // customer-client.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.CustomerClient = void 0;
// customer-client.ts - Customer management API client
// base_client_1 importedclass CustomerClient extends base_client_1.BaseClient {
    /**
     * Register a new customer
     */
    async register(data) {
        return this.post('/api/customers/register', data);
    }
    /**
     * Login customer
     */
    async login(data) {
        return this.post('/api/customers/login', data);
    }
    /**
     * Get customer profile
     */
    async getProfile(token) {
        return this.get('/api/customers/profile', token);
    }
    /**
     * Update customer profile
     */
    async updateProfile(token, data) {
        return this.put('/api/customers/profile', data, token);
    }
    /**
     * Change password
     */
    async changePassword(token, data) {
        return this.post('/api/customers/change-password', data, token);
    }
    /**
     * Get all customers (Admin only)
     */
    async getAllCustomers(token) {
        return this.get('/api/customers', token);
    }
}
exports.CustomerClient = CustomerClient;
//# sourceMappingURL=customer-client.js.map
    
    modules['customer-client'] = module.exports;
  })();

  // website-client.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.WebsiteClient = void 0;
// website-client.ts - Website management API client
// base_client_1 importedclass WebsiteClient extends base_client_1.BaseClient {
    /**
     * Create a new website
     */
    async create(token, data) {
        return this.post('/api/websites', data, token);
    }
    /**
     * Get all websites for the authenticated customer
     */
    async getAll(token) {
        return this.get('/api/websites', token);
    }
    /**
     * Get website by ID
     */
    async getById(token, websiteId) {
        return this.get(`/api/websites/${websiteId}`, token);
    }
    /**
     * Update website
     */
    async update(token, websiteId, data) {
        return this.put(`/api/websites/${websiteId}`, data, token);
    }
    /**
     * Delete website
     */
    async delete(token, websiteId) {
        return this.delete(`/api/websites/${websiteId}`, token);
    }
    /**
     * Get tracking code for website
     */
    async getTrackingCode(token, websiteId) {
        return this.get(`/api/websites/${websiteId}/tracking-code`, token);
    }
    /**
     * Get website statistics
     */
    async getStats(token) {
        return this.get('/api/websites/stats', token);
    }
}
exports.WebsiteClient = WebsiteClient;
//# sourceMappingURL=website-client.js.map
    
    modules['website-client'] = module.exports;
  })();

  // apikey-client.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.APIKeyClient = void 0;
// apikey-client.ts - API Key management client
// base_client_1 importedclass APIKeyClient extends base_client_1.BaseClient {
    /**
     * Create a new API key
     */
    async create(token, data) {
        return this.post('/api/api-keys', data, token);
    }
    /**
     * Get all API keys for the authenticated customer
     */
    async getAll(token) {
        return this.get('/api/api-keys', token);
    }
    /**
     * Get API key by ID
     */
    async getById(token, apiKeyId) {
        return this.get(`/api/api-keys/${apiKeyId}`, token);
    }
    /**
     * Update API key
     */
    async update(token, apiKeyId, data) {
        return this.put(`/api/api-keys/${apiKeyId}`, data, token);
    }
    /**
     * Delete API key
     */
    async delete(token, apiKeyId) {
        return this.delete(`/api/api-keys/${apiKeyId}`, token);
    }
    /**
     * Regenerate API key
     */
    async regenerate(token, apiKeyId) {
        return this.post(`/api/api-keys/${apiKeyId}/regenerate`, undefined, token);
    }
    /**
     * Validate API key
     */
    async validate(apiKey) {
        return this.post('/api/api-keys/validate', { api_key: apiKey });
    }
    /**
     * Get API key statistics
     */
    async getStats(token) {
        return this.get('/api/api-keys/stats', token);
    }
}
exports.APIKeyClient = APIKeyClient;
//# sourceMappingURL=apikey-client.js.map
    
    modules['apikey-client'] = module.exports;
  })();

  // user-client.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.UserClient = void 0;
// user-client.ts - User management API client
// base_client_1 importedclass UserClient extends base_client_1.BaseClient {
    /**
     * Create a new user
     */
    async create(data) {
        return this.post('/api/users', data);
    }
    /**
     * Get users with pagination
     */
    async getAll(token, query = {}) {
        const params = new URLSearchParams();
        if (query.limit)
            params.append('limit', String(query.limit));
        if (query.offset)
            params.append('offset', String(query.offset));
        return this.get(`/api/users?${params.toString()}`, token);
    }
    /**
     * Get user by ID
     */
    async getById(token, userId) {
        return this.get(`/api/users/${userId}`, token);
    }
    /**
     * Get user by email
     */
    async getByEmail(token, email) {
        return this.get(`/api/users/by-email/${encodeURIComponent(email)}`, token);
    }
    /**
     * Update user
     */
    async update(token, userId, data) {
        return this.put(`/api/users/${userId}`, data, token);
    }
    /**
     * Delete user
     */
    async delete(token, userId) {
        return this.delete(`/api/users/${userId}`, token);
    }
    /**
     * Get user activities
     */
    async getActivities(token, userId, limit = 50) {
        return this.get(`/api/users/${userId}/activities?limit=${limit}`, token);
    }
    /**
     * Get user statistics
     */
    async getStats(token, userId) {
        return this.get(`/api/users/${userId}/stats`, token);
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=user-client.js.map
    
    modules['user-client'] = module.exports;
  })();

  // analytics-client.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.AnalyticsClient = void 0;
// analytics-client.ts - Analytics and reporting API client
// base_client_1 importedclass AnalyticsClient extends base_client_1.BaseClient {
    /**
     * Get realtime analytics for a website
     */
    async getRealtime(token, websiteId) {
        return this.get(`/api/analytics/realtime/${websiteId}`, token);
    }
    /**
     * Get historical reports
     */
    async getHistoricalReports(token, websiteId, query) {
        const params = new URLSearchParams();
        params.append('startDate', query.startDate);
        params.append('endDate', query.endDate);
        if (query.metrics)
            params.append('metrics', query.metrics);
        return this.get(`/api/analytics/reports/${websiteId}?${params.toString()}`, token);
    }
    /**
     * Get user journey
     */
    async getUserJourney(token, userId) {
        return this.get(`/api/analytics/user-journey/${userId}`, token);
    }
    /**
     * Get page analytics
     */
    async getPageAnalytics(token, websiteId, query) {
        const params = new URLSearchParams();
        params.append('startDate', query.startDate);
        params.append('endDate', query.endDate);
        return this.get(`/api/analytics/pages/${websiteId}?${params.toString()}`, token);
    }
    /**
     * Get event analytics
     */
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
//# sourceMappingURL=analytics-client.js.map
    
    modules['analytics-client'] = module.exports;
  })();

  // tracking-api.js
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    exports.TrackerEnum = exports.AnalyticsClient = exports.UserClient = exports.TrackingClient = exports.APIKeyClient = exports.WebsiteClient = exports.CustomerClient = exports.TrackingAPI = void 0;
// customer_client_1 imported// website_client_1 imported// apikey_client_1 imported// tracking_client_1 imported// user_client_1 imported// analytics_client_1 importedclass TrackingAPI {
    constructor(options = {}) {
        this.token = null;
        // Initialize all client modules
        this.customers = new customer_client_1.CustomerClient(options);
        this.websites = new website_client_1.WebsiteClient(options);
        this.apiKeys = new apikey_client_1.APIKeyClient(options);
        this.tracking = new tracking_client_1.TrackingClient(options);
        this.users = new user_client_1.UserClient(options);
        this.analytics = new analytics_client_1.AnalyticsClient(options);
    }
    /**
     * Set authentication token for API calls
     */
    setToken(token) {
        this.token = token;
    }
    /**
     * Get current authentication token
     */
    getToken() {
        return this.token;
    }
    /**
     * Clear authentication token
     */
    clearToken() {
        this.token = null;
    }
    /**
     * Check API health
     */
    async healthCheck() {
        return this.tracking.healthCheck();
    }
    // Convenience methods that delegate to tracking client
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
// Export individual clients for advanced usage
var customer_client_2 = {};
Object.defineProperty(exports, "CustomerClient", { enumerable: true, get: function () { return customer_client_2.CustomerClient; } });
var website_client_2 = {};
Object.defineProperty(exports, "WebsiteClient", { enumerable: true, get: function () { return website_client_2.WebsiteClient; } });
var apikey_client_2 = {};
Object.defineProperty(exports, "APIKeyClient", { enumerable: true, get: function () { return apikey_client_2.APIKeyClient; } });
var tracking_client_2 = {};
Object.defineProperty(exports, "TrackingClient", { enumerable: true, get: function () { return tracking_client_2.TrackingClient; } });
var user_client_2 = {};
Object.defineProperty(exports, "UserClient", { enumerable: true, get: function () { return user_client_2.UserClient; } });
var analytics_client_2 = {};
Object.defineProperty(exports, "AnalyticsClient", { enumerable: true, get: function () { return analytics_client_2.AnalyticsClient; } });
var tracker_enum_1 = {};
Object.defineProperty(exports, "TrackerEnum", { enumerable: true, get: function () { return tracker_enum_1.TrackerEnum; } });
//# sourceMappingURL=tracking-api.js.map
    
    modules['tracking-api'] = module.exports;
  })();

  
  // Browser API
  var TrackerAPI = {
    // Main classes
    TrackingAPI: modules['tracking-api'].TrackingAPI,
    TrackerEnum: modules['tracker.enum'].TrackerEnum,
    
    // Global tracker
    globalTracker: null,
    
    // Initialize function
    init: function(options) {
      if (!options.apiKey) {
        console.warn('TrackerAPI: apiKey is required for browser usage');
      }
      if (!options.baseUrl) {
        console.warn('TrackerAPI: baseUrl is required for browser usage');
      }
      
      this.globalTracker = new this.TrackingAPI(options || {});
      return this.globalTracker;
    },
    
    // Get tracker
    getTracker: function() {
      if (!this.globalTracker) {
        console.warn('TrackerAPI: Please call init() first');
        return null;
      }
      return this.globalTracker;
    },
    
    // Create new tracker
    createTracker: function(options) {
      return new this.TrackingAPI(options || {});
    },
    
    // Track functions
    track: async function(eventData, immediate) {
      const tracker = this.getTracker();
      if (!tracker) return null;
      return await tracker.track(eventData, immediate);
    },
    
    trackBatch: async function(events) {
      const tracker = this.getTracker();
      if (!tracker) return null;
      return await tracker.trackBatch(events);
    },
    
    // Event-specific functions
    trackPageView: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.pageview,
        event_name: eventData.event_name || this.TrackerEnum.EventName.view_product,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackClick: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.click,
        event_name: eventData.event_name || this.TrackerEnum.EventName.button_click,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackSubmit: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.submit,
        event_name: eventData.event_name || this.TrackerEnum.EventName.contact_form_submit,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackScroll: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.scroll,
        event_name: eventData.event_name || this.TrackerEnum.EventName.scroll_to_bottom,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackChange: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.change,
        event_name: eventData.event_name || this.TrackerEnum.EventName.form_input_change,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    // Business functions
    trackAddToCart: async function(eventData) {
      return this.trackClick({
        ...eventData,
        event_name: this.TrackerEnum.EventName.add_to_cart,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.add_to_cart_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.add_to_cart
      });
    },
    
    trackPurchase: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.purchase
      });
    },
    
    trackLoginFormSubmit: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.login_form_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.login_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.login
      });
    },
    
    trackSignupFormSubmit: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.signup_form_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.signup_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.signup
      });
    },
    
    trackSearchQuerySubmit: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.search_query_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.search_input,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.search
      });
    },
    
    flush: async function() {
      const tracker = this.getTracker();
      if (!tracker) return null;
      return await tracker.flush();
    }
  };
  
  // Make it available globally
  global.TrackerAPI = TrackerAPI;
  
  // Also expose on window for backward compatibility
  if (typeof window !== 'undefined') {
    window.TrackerAPI = TrackerAPI;
  }
  
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);

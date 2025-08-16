(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            if (typeof process !== 'undefined' && process.env) {
                if (process.env.NODE_ENV === 'production') {
                    return process.env.TRACKER_API_PROD_URL || 'https://api.yourdomain.com';
                }
                return process.env.TRACKER_API_DEV_URL || 'http://localhost:3002';
            }
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
});

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
    exports.WebsiteClient = void 0;
    const base_client_1 = require("./base-client");
    class WebsiteClient extends base_client_1.BaseClient {
        async create(token, data) {
            return this.post('/api/websites', data, token);
        }
        async getAll(token) {
            return this.get('/api/websites', token);
        }
        async getById(token, websiteId) {
            return this.get(`/api/websites/${websiteId}`, token);
        }
        async update(token, websiteId, data) {
            return this.put(`/api/websites/${websiteId}`, data, token);
        }
        async delete(token, websiteId) {
            return this.delete(`/api/websites/${websiteId}`, token);
        }
        async getTrackingCode(token, websiteId) {
            return this.get(`/api/websites/${websiteId}/tracking-code`, token);
        }
        async getStats(token) {
            return this.get('/api/websites/stats', token);
        }
    }
    exports.WebsiteClient = WebsiteClient;
});

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
    exports.APIKeyClient = void 0;
    const base_client_1 = require("./base-client");
    class APIKeyClient extends base_client_1.BaseClient {
        async create(token, data) {
            return this.post('/api/api-keys', data, token);
        }
        async getAll(token) {
            return this.get('/api/api-keys', token);
        }
        async getById(token, apiKeyId) {
            return this.get(`/api/api-keys/${apiKeyId}`, token);
        }
        async update(token, apiKeyId, data) {
            return this.put(`/api/api-keys/${apiKeyId}`, data, token);
        }
        async delete(token, apiKeyId) {
            return this.delete(`/api/api-keys/${apiKeyId}`, token);
        }
        async regenerate(token, apiKeyId) {
            return this.post(`/api/api-keys/${apiKeyId}/regenerate`, undefined, token);
        }
        async validate(apiKey) {
            return this.post('/api/api-keys/validate', { api_key: apiKey });
        }
        async getStats(token) {
            return this.get('/api/api-keys/stats', token);
        }
    }
    exports.APIKeyClient = APIKeyClient;
});

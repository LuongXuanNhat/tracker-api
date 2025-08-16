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
    exports.UserClient = void 0;
    const base_client_1 = require("./base-client");
    class UserClient extends base_client_1.BaseClient {
        async create(data) {
            return this.post('/api/users', data);
        }
        async getAll(token, query = {}) {
            const params = new URLSearchParams();
            if (query.limit)
                params.append('limit', String(query.limit));
            if (query.offset)
                params.append('offset', String(query.offset));
            return this.get(`/api/users?${params.toString()}`, token);
        }
        async getById(token, userId) {
            return this.get(`/api/users/${userId}`, token);
        }
        async getByEmail(token, email) {
            return this.get(`/api/users/by-email/${encodeURIComponent(email)}`, token);
        }
        async update(token, userId, data) {
            return this.put(`/api/users/${userId}`, data, token);
        }
        async delete(token, userId) {
            return this.delete(`/api/users/${userId}`, token);
        }
        async getActivities(token, userId, limit = 50) {
            return this.get(`/api/users/${userId}/activities?limit=${limit}`, token);
        }
        async getStats(token, userId) {
            return this.get(`/api/users/${userId}/stats`, token);
        }
    }
    exports.UserClient = UserClient;
});

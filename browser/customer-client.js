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
    exports.CustomerClient = void 0;
    const base_client_1 = require("./base-client");
    class CustomerClient extends base_client_1.BaseClient {
        async register(data) {
            return this.post('/api/customers/register', data);
        }
        async login(data) {
            return this.post('/api/customers/login', data);
        }
        async getProfile(token) {
            return this.get('/api/customers/profile', token);
        }
        async updateProfile(token, data) {
            return this.put('/api/customers/profile', data, token);
        }
        async changePassword(token, data) {
            return this.post('/api/customers/change-password', data, token);
        }
        async getAllCustomers(token) {
            return this.get('/api/customers', token);
        }
    }
    exports.CustomerClient = CustomerClient;
});

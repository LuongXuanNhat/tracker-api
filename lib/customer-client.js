// lib/customer-client.js - Customer management API client (JavaScript version)
const { BaseClient } = require('./base-client');

class CustomerClient extends BaseClient {
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

module.exports = { CustomerClient };

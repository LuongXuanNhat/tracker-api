// lib/website-client.js - Website management API client (JavaScript version)
const { BaseClient } = require('./base-client');

class WebsiteClient extends BaseClient {
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

module.exports = { WebsiteClient };

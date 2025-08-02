// lib/user-client.js - User management API client (JavaScript version)
const { BaseClient } = require('./base-client');

class UserClient extends BaseClient {
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
    if (query.limit) params.append('limit', String(query.limit));
    if (query.offset) params.append('offset', String(query.offset));
    
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

module.exports = { UserClient };

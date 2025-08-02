// lib/apikey-client.js - API Key management client (JavaScript version)
const { BaseClient } = require('./base-client');

class APIKeyClient extends BaseClient {
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

module.exports = { APIKeyClient };

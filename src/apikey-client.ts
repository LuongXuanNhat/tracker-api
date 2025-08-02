// apikey-client.ts - API Key management client
import { BaseClient } from './base-client';
import { 
  APIKeyCreate, 
  APIKeyUpdate,
  APIKeyResponse,
  APIResponse
} from './types';

export class APIKeyClient extends BaseClient {
  /**
   * Create a new API key
   */
  async create(token: string, data: APIKeyCreate): Promise<APIKeyResponse> {
    return this.post('/api/api-keys', data, token);
  }

  /**
   * Get all API keys for the authenticated customer
   */
  async getAll(token: string): Promise<APIResponse> {
    return this.get('/api/api-keys', token);
  }

  /**
   * Get API key by ID
   */
  async getById(token: string, apiKeyId: string): Promise<APIKeyResponse> {
    return this.get(`/api/api-keys/${apiKeyId}`, token);
  }

  /**
   * Update API key
   */
  async update(token: string, apiKeyId: string, data: APIKeyUpdate): Promise<APIKeyResponse> {
    return this.put(`/api/api-keys/${apiKeyId}`, data, token);
  }

  /**
   * Delete API key
   */
  async delete(token: string, apiKeyId: string): Promise<APIResponse> {
    return this.delete(`/api/api-keys/${apiKeyId}`, token);
  }

  /**
   * Regenerate API key
   */
  async regenerate(token: string, apiKeyId: string): Promise<APIKeyResponse> {
    return this.post(`/api/api-keys/${apiKeyId}/regenerate`, undefined, token);
  }

  /**
   * Validate API key
   */
  async validate(apiKey: string): Promise<APIResponse> {
    return this.post('/api/api-keys/validate', { api_key: apiKey });
  }

  /**
   * Get API key statistics
   */
  async getStats(token: string): Promise<APIResponse> {
    return this.get('/api/api-keys/stats', token);
  }
}

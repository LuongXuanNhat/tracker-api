// website-client.ts - Website management API client
import { BaseClient } from './base-client';
import { 
  WebsiteCreate, 
  WebsiteUpdate,
  WebsiteResponse,
  WebsiteStats,
  APIResponse
} from './types';

export class WebsiteClient extends BaseClient {
  /**
   * Create a new website
   */
  async create(token: string, data: WebsiteCreate): Promise<WebsiteResponse> {
    return this.post('/api/websites', data, token);
  }

  /**
   * Get all websites for the authenticated customer
   */
  async getAll(token: string): Promise<APIResponse> {
    return this.get('/api/websites', token);
  }

  /**
   * Get website by ID
   */
  async getById(token: string, websiteId: string): Promise<WebsiteResponse> {
    return this.get(`/api/websites/${websiteId}`, token);
  }

  /**
   * Update website
   */
  async update(token: string, websiteId: string, data: WebsiteUpdate): Promise<WebsiteResponse> {
    return this.put(`/api/websites/${websiteId}`, data, token);
  }

  /**
   * Delete website
   */
  async delete(token: string, websiteId: string): Promise<APIResponse> {
    return this.delete(`/api/websites/${websiteId}`, token);
  }

  /**
   * Get tracking code for website
   */
  async getTrackingCode(token: string, websiteId: string): Promise<APIResponse> {
    return this.get(`/api/websites/${websiteId}/tracking-code`, token);
  }

  /**
   * Get website statistics
   */
  async getStats(token: string): Promise<APIResponse<WebsiteStats>> {
    return this.get('/api/websites/stats', token);
  }
}

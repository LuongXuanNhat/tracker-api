// user-client.ts - User management API client
import { BaseClient } from './base-client';
import { 
  UserCreate, 
  UserUpdate,
  UserResponse,
  UserStats,
  PaginationQuery,
  APIResponse
} from './types';

export class UserClient extends BaseClient {
  /**
   * Create a new user
   */
  async create(data: UserCreate): Promise<UserResponse> {
    return this.post('/api/users', data);
  }

  /**
   * Get users with pagination
   */
  async getAll(token: string, query: PaginationQuery = {}): Promise<APIResponse> {
    const params = new URLSearchParams();
    if (query.limit) params.append('limit', String(query.limit));
    if (query.offset) params.append('offset', String(query.offset));
    
    return this.get(`/api/users?${params.toString()}`, token);
  }

  /**
   * Get user by ID
   */
  async getById(token: string, userId: string): Promise<UserResponse> {
    return this.get(`/api/users/${userId}`, token);
  }

  /**
   * Get user by email
   */
  async getByEmail(token: string, email: string): Promise<UserResponse> {
    return this.get(`/api/users/by-email/${encodeURIComponent(email)}`, token);
  }

  /**
   * Update user
   */
  async update(token: string, userId: string, data: UserUpdate): Promise<UserResponse> {
    return this.put(`/api/users/${userId}`, data, token);
  }

  /**
   * Delete user
   */
  async delete(token: string, userId: string): Promise<APIResponse> {
    return this.delete(`/api/users/${userId}`, token);
  }

  /**
   * Get user activities
   */
  async getActivities(token: string, userId: string, limit: number = 50): Promise<APIResponse> {
    return this.get(`/api/users/${userId}/activities?limit=${limit}`, token);
  }

  /**
   * Get user statistics
   */
  async getStats(token: string, userId: string): Promise<APIResponse<UserStats>> {
    return this.get(`/api/users/${userId}/stats`, token);
  }
}

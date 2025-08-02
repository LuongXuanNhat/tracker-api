// customer-client.ts - Customer management API client
import { BaseClient } from './base-client';
import { 
  CustomerRegistration, 
  CustomerLogin, 
  CustomerUpdate, 
  ChangePassword,
  AuthResponse,
  CustomerResponse,
  APIResponse
} from './types';

export class CustomerClient extends BaseClient {
  /**
   * Register a new customer
   */
  async register(data: CustomerRegistration): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>('/api/customers/register', data);
  }

  /**
   * Login customer
   */
  async login(data: CustomerLogin): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>('/api/customers/login', data);
  }

  /**
   * Get customer profile
   */
  async getProfile(token: string): Promise<CustomerResponse> {
    return this.get<any>('/api/customers/profile', token);
  }

  /**
   * Update customer profile
   */
  async updateProfile(token: string, data: CustomerUpdate): Promise<CustomerResponse> {
    return this.put<any>('/api/customers/profile', data, token);
  }

  /**
   * Change password
   */
  async changePassword(token: string, data: ChangePassword): Promise<APIResponse> {
    return this.post('/api/customers/change-password', data, token);
  }

  /**
   * Get all customers (Admin only)
   */
  async getAllCustomers(token: string): Promise<APIResponse> {
    return this.get('/api/customers', token);
  }
}

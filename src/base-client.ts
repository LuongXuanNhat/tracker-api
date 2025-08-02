// base-client.ts - Base HTTP client for API communication
import { TrackerOptions, APIResponse, APIError } from './types';

export class BaseClient {
  protected baseURL: string;
  protected apiKey: string | null;
  protected timeout: number;
  protected retryAttempts: number;
  protected retryDelay: number;
  protected debug: boolean;

  constructor(options: TrackerOptions = {}) {
    this.baseURL = options.baseUrl || this.getDefaultBaseURL();
    this.apiKey = options.apiKey || null;
    this.timeout = options.timeout || 5000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.debug = options.debug || false;
  }

  private getDefaultBaseURL(): string {
    // Check for environment variables
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.NODE_ENV === 'production') {
        return process.env.TRACKER_API_PROD_URL || 'https://api.yourdomain.com';
      }
      return process.env.TRACKER_API_DEV_URL || 'http://localhost:3002';
    }
    
    // Browser fallback
    if (typeof window !== 'undefined') {
      return window.location.origin.includes('localhost') 
        ? 'http://localhost:3002' 
        : 'https://api.yourdomain.com';
    }
    
    return 'http://localhost:3002';
  }

  protected getHeaders(includeAuth: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (includeAuth && this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }
    
    return headers;
  }

  protected getAuthHeaders(token: string): Record<string, string> {
    return {
      ...this.getHeaders(false),
      'Authorization': `Bearer ${token}`,
    };
  }

  protected async makeRequest<T = any>(
    endpoint: string, 
    options: RequestInit = {}, 
    attempt: number = 1,
    token?: string
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const headers = token 
        ? this.getAuthHeaders(token)
        : this.getHeaders();

      if (this.debug) {
        console.log(`[TrackerAPI] ${options.method || 'GET'} ${url}`);
        if (options.body) {
          console.log('[TrackerAPI] Request body:', options.body);
        }
      }
      
      const response = await fetch(url, {
        ...options,
        headers: { ...headers, ...options.headers },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const responseData = await response.json();
      
      if (this.debug) {
        console.log('[TrackerAPI] Response:', responseData);
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseData.message || response.statusText}`);
      }
      
      return responseData;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (this.debug) {
        console.error('[TrackerAPI] Request failed:', error);
      }
      
      if (attempt < this.retryAttempts && !controller.signal.aborted) {
        await this.delay(this.retryDelay * attempt);
        return this.makeRequest<T>(endpoint, options, attempt + 1, token);
      }
      
      throw error;
    }
  }

  protected delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Utility methods for common HTTP verbs
  protected async get<T>(endpoint: string, token?: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'GET' }, 1, token);
  }

  protected async post<T>(endpoint: string, data?: any, token?: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, 1, token);
  }

  protected async put<T>(endpoint: string, data?: any, token?: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, 1, token);
  }

  protected async delete<T>(endpoint: string, token?: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' }, 1, token);
  }
}

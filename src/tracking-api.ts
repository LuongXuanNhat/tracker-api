// tracking-api-new.ts - Main API client combining all modules
import { TrackerOptions } from './types';
import { CustomerClient } from './customer-client';
import { WebsiteClient } from './website-client';
import { APIKeyClient } from './apikey-client';
import { TrackingClient } from './tracking-client';
import { UserClient } from './user-client';
import { AnalyticsClient } from './analytics-client';

export class TrackingAPI {
  public customers: CustomerClient;
  public websites: WebsiteClient;
  public apiKeys: APIKeyClient;
  public tracking: TrackingClient;
  public users: UserClient;
  public analytics: AnalyticsClient;

  private token: string | null = null;

  constructor(options: TrackerOptions = {}) {
    // Initialize all client modules
    this.customers = new CustomerClient(options);
    this.websites = new WebsiteClient(options);
    this.apiKeys = new APIKeyClient(options);
    this.tracking = new TrackingClient(options);
    this.users = new UserClient(options);
    this.analytics = new AnalyticsClient(options);
  }

  /**
   * Set authentication token for API calls
   */
  setToken(token: string): void {
    this.token = token;
  }

  /**
   * Get current authentication token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    this.token = null;
  }

  /**
   * Check API health
   */
  async healthCheck() {
    return this.tracking.healthCheck();
  }

  // Convenience methods that delegate to tracking client
  async track(eventData: any, immediate?: boolean) {
    return this.tracking.trackEvent(eventData, immediate);
  }

  async trackBatch(events: any[]) {
    return this.tracking.trackBatch(events);
  }

  async trackPageView(userId: string, pageUrl: string, sessionId?: string, metadata?: Record<string, any>) {
    return this.tracking.trackPageView(userId, pageUrl, sessionId, metadata);
  }

  async trackClick(userId: string, elementType: string, pageUrl: string, elementId?: string, sessionId?: string, metadata?: Record<string, any>) {
    return this.tracking.trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata);
  }

  async trackScroll(userId: string, pageUrl: string, scrollPercentage: number, sessionId?: string, metadata?: Record<string, any>) {
    return this.tracking.trackScroll(userId, pageUrl, scrollPercentage, sessionId, metadata);
  }

  async trackCustomEvent(eventType: string, userId: string, pageUrl: string, sessionId?: string, metadata?: Record<string, any>) {
    return this.tracking.trackCustomEvent(eventType, userId, pageUrl, sessionId, metadata);
  }

  async flush() {
    return this.tracking.flush();
  }
}

// Export individual clients for advanced usage
export { CustomerClient } from './customer-client';
export { WebsiteClient } from './website-client';
export { APIKeyClient } from './apikey-client';
export { TrackingClient } from './tracking-client';
export { UserClient } from './user-client';
export { AnalyticsClient } from './analytics-client';

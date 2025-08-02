// analytics-client.ts - Analytics and reporting API client
import { BaseClient } from './base-client';
import { 
  RealtimeResponse,
  ReportResponse,
  JourneyResponse,
  PageAnalyticsResponse,
  EventAnalyticsResponse,
  DateRangeQuery,
  APIResponse
} from './types';

export class AnalyticsClient extends BaseClient {
  /**
   * Get realtime analytics for a website
   */
  async getRealtime(token: string, websiteId: string): Promise<RealtimeResponse> {
    return this.get(`/api/analytics/realtime/${websiteId}`, token);
  }

  /**
   * Get historical reports
   */
  async getHistoricalReports(
    token: string, 
    websiteId: string, 
    query: DateRangeQuery & { metrics?: string }
  ): Promise<ReportResponse> {
    const params = new URLSearchParams();
    params.append('startDate', query.startDate);
    params.append('endDate', query.endDate);
    if (query.metrics) params.append('metrics', query.metrics);
    
    return this.get(`/api/analytics/reports/${websiteId}?${params.toString()}`, token);
  }

  /**
   * Get user journey
   */
  async getUserJourney(token: string, userId: string): Promise<JourneyResponse> {
    return this.get(`/api/analytics/user-journey/${userId}`, token);
  }

  /**
   * Get page analytics
   */
  async getPageAnalytics(
    token: string, 
    websiteId: string, 
    query: DateRangeQuery
  ): Promise<PageAnalyticsResponse> {
    const params = new URLSearchParams();
    params.append('startDate', query.startDate);
    params.append('endDate', query.endDate);
    
    return this.get(`/api/analytics/pages/${websiteId}?${params.toString()}`, token);
  }

  /**
   * Get event analytics
   */
  async getEventAnalytics(
    token: string, 
    websiteId: string, 
    query: DateRangeQuery & { eventType?: string }
  ): Promise<EventAnalyticsResponse> {
    const params = new URLSearchParams();
    params.append('startDate', query.startDate);
    params.append('endDate', query.endDate);
    if (query.eventType) params.append('eventType', query.eventType);
    
    return this.get(`/api/analytics/events/${websiteId}?${params.toString()}`, token);
  }
}

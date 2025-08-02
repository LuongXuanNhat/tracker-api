// lib/analytics-client.js - Analytics and reporting API client (JavaScript version)
const { BaseClient } = require('./base-client');

class AnalyticsClient extends BaseClient {
  /**
   * Get realtime analytics for a website
   */
  async getRealtime(token, websiteId) {
    return this.get(`/api/analytics/realtime/${websiteId}`, token);
  }

  /**
   * Get historical reports
   */
  async getHistoricalReports(token, websiteId, query) {
    const params = new URLSearchParams();
    params.append('startDate', query.startDate);
    params.append('endDate', query.endDate);
    if (query.metrics) params.append('metrics', query.metrics);
    
    return this.get(`/api/analytics/reports/${websiteId}?${params.toString()}`, token);
  }

  /**
   * Get user journey
   */
  async getUserJourney(token, userId) {
    return this.get(`/api/analytics/user-journey/${userId}`, token);
  }

  /**
   * Get page analytics
   */
  async getPageAnalytics(token, websiteId, query) {
    const params = new URLSearchParams();
    params.append('startDate', query.startDate);
    params.append('endDate', query.endDate);
    
    return this.get(`/api/analytics/pages/${websiteId}?${params.toString()}`, token);
  }

  /**
   * Get event analytics
   */
  async getEventAnalytics(token, websiteId, query) {
    const params = new URLSearchParams();
    params.append('startDate', query.startDate);
    params.append('endDate', query.endDate);
    if (query.eventType) params.append('eventType', query.eventType);
    
    return this.get(`/api/analytics/events/${websiteId}?${params.toString()}`, token);
  }
}

module.exports = { AnalyticsClient };

// types.ts - Complete type definitions for User Behavior Tracking API

// Base configuration interfaces
export interface TrackerOptions {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  batchSize?: number;
  batchTimeout?: number;
  debug?: boolean;
}

export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Customer Management Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  subscription_plan?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerRegistration {
  name: string;
  email: string;
  password: string;
  websiteName: string;
  websiteUrl: string;
}

export interface CustomerLogin {
  email: string;
  password: string;
}

export interface CustomerUpdate {
  name?: string;
  email?: string;
  subscription_plan?: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

// Website Management Types
export interface Website {
  id: string;
  name: string;
  url: string;
  type: 'development' | 'staging' | 'production';
  description?: string;
  customer_id: string;
  created_at: string;
  updated_at: string;
}

export interface WebsiteCreate {
  name: string;
  url: string;
  type: 'development' | 'staging' | 'production';
  description?: string;
}

export interface WebsiteUpdate {
  name?: string;
  url?: string;
  description?: string;
}

export interface WebsiteStats {
  total_events: number;
  total_users: number;
  total_sessions: number;
  today_events: number;
  today_users: number;
}

// API Key Management Types
export interface APIKey {
  id: string;
  api_key: string;
  website_id: string;
  type: 'development' | 'staging' | 'production';
  description?: string;
  is_active: boolean;
  last_used_at?: string;
  created_at: string;
}

export interface APIKeyCreate {
  website_id: string;
  type: 'development' | 'staging' | 'production';
  description?: string;
}

export interface APIKeyUpdate {
  description?: string;
  is_active?: boolean;
}

// Event Tracking Types
export interface EventData {
  event_type: string;
  element_type?: string;
  page_url: string;
  element_id?: string;
  user_id: string;
  session_id?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  timestamp?: number;
}

export interface BatchEventData {
  events: EventData[];
}

// User Management Types
export interface User {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  properties?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  email?: string;
  first_name?: string;
  last_name?: string;
  properties?: Record<string, any>;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  properties?: Record<string, any>;
}

export interface UserActivity {
  id: string;
  user_id: string;
  event_type: string;
  page_url: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface UserStats {
  total_events: number;
  first_seen: string;
  last_seen: string;
  total_sessions: number;
  avg_session_duration: number;
}

// Analytics Types
export interface RealtimeAnalytics {
  active_users: number;
  current_page_views: number;
  top_pages: Array<{
    page_url: string;
    views: number;
  }>;
  recent_events: EventData[];
}

export interface HistoricalReport {
  date_range: {
    start_date: string;
    end_date: string;
  };
  metrics: {
    pageviews: number;
    users: number;
    sessions: number;
    bounce_rate: number;
    avg_session_duration: number;
  };
  daily_breakdown: Array<{
    date: string;
    pageviews: number;
    users: number;
    sessions: number;
  }>;
}

export interface UserJourney {
  user_id: string;
  sessions: Array<{
    session_id: string;
    start_time: string;
    end_time: string;
    events: EventData[];
  }>;
}

export interface PageAnalytics {
  page_url: string;
  pageviews: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_time_on_page: number;
  top_referrers: Array<{
    referrer: string;
    visits: number;
  }>;
}

export interface EventAnalytics {
  event_type: string;
  total_events: number;
  unique_users: number;
  top_elements: Array<{
    element_id: string;
    element_type: string;
    count: number;
  }>;
  hourly_breakdown: Array<{
    hour: number;
    count: number;
  }>;
}

// Query Parameters Types
export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  websiteId?: string;
}

export interface PaginationQuery {
  limit?: number;
  offset?: number;
}

export interface EventQuery extends DateRangeQuery, PaginationQuery {
  eventType?: string;
  userId?: string;
  sessionId?: string;
}

// Response Types
export type TrackingResponse = APIResponse;
export type CustomerResponse = APIResponse<Customer>;
export type WebsiteResponse = APIResponse<Website>;
export type APIKeyResponse = APIResponse<APIKey>;
export type UserResponse = APIResponse<User>;
export type RealtimeResponse = APIResponse<RealtimeAnalytics>;
export type ReportResponse = APIResponse<HistoricalReport>;
export type JourneyResponse = APIResponse<UserJourney>;
export type PageAnalyticsResponse = APIResponse<PageAnalytics[]>;
export type EventAnalyticsResponse = APIResponse<EventAnalytics>;

// Auth Response Types
export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    customer: Customer;
    website?: Website;
    apiKey?: APIKey;
  };
}

// Error Types
export interface APIError {
  success: false;
  error: string;
  message: string;
  status?: number;
}

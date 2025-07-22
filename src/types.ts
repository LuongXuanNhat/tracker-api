// types.ts
export interface TrackerOptions {
  apiKey?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  batchSize?: number;
  batchTimeout?: number;
}

export interface EventData {
  userId: string;
  eventType: string;
  elementType?: string;
  pageUrl?: string;
  elementId?: string | null;
  metadata?: Record<string, any>;
  timestamp?: number;
}

export interface TrackingResponse {
  success: boolean;
  message?: string;
  data?: any;
}

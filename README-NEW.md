# Tracker API

A comprehensive TypeScript/JavaScript library for user behavior tracking and analytics, supporting the complete User Behavior Tracking API ecosystem.

## Installation

```bash
npm install tracker-api
```

## Features

- **Complete API Coverage**: Customer management, website management, API keys, event tracking, user management, and analytics
- **TypeScript Support**: Full type definitions with intellisense support
- **JavaScript Compatible**: Works seamlessly with pure JavaScript projects
- **Batch Processing**: Automatic event batching for optimal performance
- **Retry Logic**: Built-in retry mechanism for failed requests
- **Browser & Node.js**: Works in both browser and server environments
- **Modular Architecture**: Use individual clients or the complete API

## Quick Start

### TypeScript

```typescript
import { init, trackPageView, trackClick } from "tracker-api";

// Initialize the tracker
const tracker = init({
  apiKey: "your-api-key",
  baseUrl: "http://localhost:3002",
  debug: true,
});

// Track events
await trackPageView("user123", "/home", "session456", {
  referrer: document.referrer,
  userAgent: navigator.userAgent,
});

await trackClick("user123", "button", "/home", "submit-btn", "session456", {
  buttonText: "Submit Form",
});
```

### JavaScript

```javascript
const { init, trackPageView, trackClick } = require("tracker-api");

// Initialize the tracker
const tracker = init({
  apiKey: "your-api-key",
  baseUrl: "http://localhost:3002",
});

// Track events
trackPageView("user123", "/home", "session456", {
  referrer: document.referrer,
}).then((response) => {
  console.log("Page view tracked:", response);
});
```

## Advanced Usage

### Using Individual Clients

```typescript
import { TrackingAPI } from "tracker-api";

const api = new TrackingAPI({
  apiKey: "your-api-key",
  baseUrl: "http://localhost:3002",
});

// Customer management
const authResponse = await api.customers.login({
  email: "user@example.com",
  password: "password123",
});

api.setToken(authResponse.data.token);

// Website management
const websites = await api.websites.getAll(api.getToken());

// Analytics
const realtimeData = await api.analytics.getRealtime(
  api.getToken(),
  "website-id"
);

// User management
const users = await api.users.getAll(api.getToken(), { limit: 50 });
```

### Event Tracking Options

```typescript
// Immediate tracking (bypasses batching)
await trackClick("user123", "button", "/page", "btn-id", "session123", {
  buttonText: "Click Me",
});

// Custom events
await trackCustomEvent("video_play", "user123", "/video-page", "session123", {
  videoId: "video-123",
  duration: 0,
  quality: "1080p",
});

// Batch tracking
await trackBatch([
  {
    event_type: "page_view",
    user_id: "user123",
    page_url: "/home",
    session_id: "session123",
  },
  {
    event_type: "click",
    user_id: "user123",
    page_url: "/home",
    element_type: "button",
    element_id: "cta-button",
    session_id: "session123",
  },
]);
```

## API Reference

### Configuration Options

```typescript
interface TrackerOptions {
  apiKey?: string; // API key for authentication
  baseUrl?: string; // Base URL for the API (default: auto-detected)
  timeout?: number; // Request timeout in ms (default: 5000)
  retryAttempts?: number; // Number of retry attempts (default: 3)
  retryDelay?: number; // Delay between retries in ms (default: 1000)
  batchSize?: number; // Events per batch (default: 10)
  batchTimeout?: number; // Batch timeout in ms (default: 2000)
  debug?: boolean; // Enable debug logging (default: false)
}
```

### Available Clients

- **CustomerClient**: User registration, login, profile management
- **WebsiteClient**: Website creation, management, tracking code generation
- **APIKeyClient**: API key creation, management, validation
- **TrackingClient**: Event tracking, analytics data collection
- **UserClient**: End-user management and activity tracking
- **AnalyticsClient**: Real-time and historical analytics reporting

### Main Tracking Methods

```typescript
// Core tracking methods
trackPageView(userId, pageUrl, sessionId?, metadata?)
trackClick(userId, elementType, pageUrl, elementId?, sessionId?, metadata?)
trackScroll(userId, pageUrl, scrollPercentage, sessionId?, metadata?)
trackCustomEvent(eventType, userId, pageUrl, sessionId?, metadata?)

// Utility methods
track(eventData, immediate?)     // Generic event tracking
trackBatch(events)              // Batch event tracking
flush()                         // Force flush pending events
```

### Customer Management

```typescript
// Register new customer
const authData = await api.customers.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  websiteName: "My Website",
  websiteUrl: "https://mywebsite.com",
});

// Login
const loginData = await api.customers.login({
  email: "john@example.com",
  password: "password123",
});

// Update profile
await api.customers.updateProfile(token, {
  name: "John Updated",
  subscription_plan: "premium",
});
```

### Analytics & Reporting

```typescript
// Real-time analytics
const realtime = await api.analytics.getRealtime(token, websiteId);

// Historical reports
const report = await api.analytics.getHistoricalReports(token, websiteId, {
  startDate: "2025-01-01",
  endDate: "2025-01-31",
  metrics: "pageviews,users,sessions",
});

// User journey analysis
const journey = await api.analytics.getUserJourney(token, userId);

// Page analytics
const pageAnalytics = await api.analytics.getPageAnalytics(token, websiteId, {
  startDate: "2025-01-01",
  endDate: "2025-01-31",
});
```

## Environment Variables

```bash
# Development
TRACKER_API_DEV_URL=http://localhost:3002

# Production
TRACKER_API_PROD_URL=https://api.yourdomain.com

# For Next.js (client-side)
NEXT_PUBLIC_TRACKER_API_URL=http://localhost:3002
```

## Error Handling

```typescript
try {
  await trackPageView("user123", "/page");
} catch (error) {
  console.error("Tracking failed:", error.message);
  // Handle error appropriately
}
```

## Browser Integration

```html
<!-- For CDN usage -->
<script src="https://unpkg.com/tracker-api/dist/index.umd.js"></script>
<script>
  const tracker = TrackerAPI.init({
    apiKey: "your-api-key",
  });

  TrackerAPI.trackPageView("user123", window.location.pathname);
</script>
```

## License

ISC

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/LuongXuanNhat/tracker-api).

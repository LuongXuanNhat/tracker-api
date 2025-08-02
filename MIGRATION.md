# Migration Guide - Tracker API v2.0

## Overview

This guide helps you migrate from the old tracker API to the new comprehensive version that supports the complete User Behavior Tracking API ecosystem.

## What's New in v2.0

### 🏗️ **Complete API Coverage**

- Customer management (registration, login, profile)
- Website management
- API key management
- Enhanced event tracking
- User management
- Real-time and historical analytics

### 🎯 **Improved Architecture**

- Modular client structure
- Better error handling
- Enhanced TypeScript support
- Backward compatibility maintained

## Breaking Changes

### 1. Import Structure (TypeScript)

**Old:**

```typescript
import { TrackingAPI } from "tracker-api";
```

**New:**

```typescript
// For simple tracking
import { init, trackPageView, trackClick } from "tracker-api";

// For advanced usage
import { TrackingAPI } from "tracker-api";
```

### 2. Event Data Structure

**Old:**

```javascript
await tracker.track({
  userId: "user123",
  eventType: "click",
  elementType: "button",
  pageUrl: "/page",
  elementId: "btn-1",
  metadata: {},
});
```

**New:**

```javascript
await tracker.track({
  event_type: "click",
  user_id: "user123",
  element_type: "button",
  page_url: "/page",
  element_id: "btn-1",
  session_id: "session123", // New field
  metadata: {},
});
```

### 3. Method Signatures

**Old:**

```javascript
trackClick(userId, elementType, pageUrl, elementId, metadata, immediate);
```

**New:**

```javascript
trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata);
```

## Migration Steps

### Step 1: Update Dependencies

```bash
npm update tracker-api
```

### Step 2: Update Initialization

**Old:**

```javascript
import { init } from "tracker-api";

const tracker = init({
  apiKey: "your-key",
  timeout: 5000,
});
```

**New (No changes needed):**

```javascript
import { init } from "tracker-api";

const tracker = init({
  apiKey: "your-key",
  baseUrl: "http://localhost:3002", // Optional: explicit base URL
  timeout: 5000,
  debug: true, // New option
});
```

### Step 3: Update Tracking Calls

**Old:**

```javascript
await trackClick("user123", "button", "/page", "btn-1", { text: "Click" });
```

**New:**

```javascript
// Add session ID parameter
await trackClick("user123", "button", "/page", "btn-1", "session123", {
  text: "Click",
});

// Or use undefined for session ID to maintain compatibility
await trackClick("user123", "button", "/page", "btn-1", undefined, {
  text: "Click",
});
```

### Step 4: Update Event Data (if using direct track method)

**Old:**

```javascript
await track({
  userId: "user123",
  eventType: "custom_event",
  pageUrl: "/page",
  metadata: { action: "signup" },
});
```

**New:**

```javascript
await track({
  event_type: "custom_event",
  user_id: "user123",
  page_url: "/page",
  session_id: "session123",
  metadata: { action: "signup" },
});
```

## New Features You Can Use

### 1. Customer Management

```javascript
import { TrackingAPI } from "tracker-api";

const api = new TrackingAPI({ apiKey: "your-key" });

// Register customer
const auth = await api.customers.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  websiteName: "My Site",
  websiteUrl: "https://mysite.com",
});

// Login
const login = await api.customers.login({
  email: "john@example.com",
  password: "password123",
});

api.setToken(login.data.token);
```

### 2. Website Management

```javascript
// Get websites
const websites = await api.websites.getAll(token);

// Create website
const newWebsite = await api.websites.create(token, {
  name: "New Site",
  url: "https://newsite.com",
  type: "production",
});
```

### 3. Analytics

```javascript
// Real-time analytics
const realtime = await api.analytics.getRealtime(token, websiteId);

// Historical reports
const report = await api.analytics.getHistoricalReports(token, websiteId, {
  startDate: "2025-01-01",
  endDate: "2025-01-31",
  metrics: "pageviews,users,sessions",
});
```

### 4. Enhanced Event Tracking

```javascript
// New custom event method
await trackCustomEvent("video_play", "user123", "/videos", "session123", {
  videoId: "intro",
  quality: "1080p",
});

// Page view with session
await trackPageView("user123", "/page", "session123", {
  title: "Page Title",
  referrer: document.referrer,
});
```

## Backward Compatibility

### Legacy Methods Still Work

These methods are deprecated but still functional:

```javascript
// ✅ Still works (deprecated)
await trackPageLoad("user123", "/page", { title: "Page" });

// ✅ Recommended new method
await trackPageView("user123", "/page", "session123", { title: "Page" });
```

### Automatic Session ID Handling

If you don't provide a session ID, the library will still work:

```javascript
// ✅ Works - session ID will be undefined
await trackClick("user123", "button", "/page", "btn-1", undefined, {
  text: "Click",
});
```

## Common Issues & Solutions

### Issue 1: Authentication Required Errors

**Problem:** Getting "Authentication token required" errors

**Solution:** Set the authentication token:

```javascript
const api = new TrackingAPI({ apiKey: "your-key" });
api.setToken("your-auth-token");

// Or get token from login
const login = await api.customers.login({ email: "...", password: "..." });
api.setToken(login.data.token);
```

### Issue 2: Event Data Format

**Problem:** Events not being tracked

**Solution:** Use the new event data format:

```javascript
// ❌ Old format
{ userId: 'user123', eventType: 'click' }

// ✅ New format
{ user_id: 'user123', event_type: 'click' }
```

### Issue 3: Missing Session IDs

**Problem:** Want to track sessions but don't have session IDs

**Solution:** Generate session IDs or use undefined:

```javascript
// Generate session ID
const sessionId =
  "session_" + Date.now() + "_" + Math.random().toString(36).substr(2);

// Or use undefined
await trackClick("user123", "button", "/page", "btn-1", undefined, {});
```

## Testing Your Migration

1. **Test Basic Tracking:**

```javascript
await trackPageView("test-user", "/test-page");
```

2. **Test Advanced Features:**

```javascript
const api = new TrackingAPI({ apiKey: "test-key" });
const health = await api.healthCheck();
console.log("Health check:", health);
```

3. **Test Error Handling:**

```javascript
try {
  await trackClick("user", "button", "/page");
} catch (error) {
  console.error("Tracking error:", error);
}
```

## Support

If you encounter issues during migration:

1. Check the console for detailed error messages
2. Enable debug mode: `init({ debug: true })`
3. Review the API documentation
4. Check the examples in the `/examples` folder

For additional help, please open an issue on the GitHub repository.

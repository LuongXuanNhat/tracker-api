# Updated Event Tracking API Documentation

## Overview

The Event Tracking API has been updated to align with the new database schema. This document outlines the changes and provides usage examples.

## Database Schema

The events are stored in a Cassandra table with the following structure:

```sql
CREATE TABLE IF NOT EXISTS events (
    website_id UUID,
    event_date TEXT, -- YYYY-MM-DD
    event_time TIMESTAMP,
    event_id UUID,
    visitor_id UUID,
    user_id UUID, -- null for anonymous
    session_id UUID,
    event_type TEXT, -- pageview, click, scroll, form_submit, purchase, etc.
    event_name TEXT, -- specific event name
    page_url TEXT,
    page_title TEXT,
    element_selector TEXT,
    element_text TEXT,
    properties MAP<TEXT, TEXT>, -- custom event properties
    device_type TEXT, -- desktop, mobile, tablet
    browser TEXT,
    os TEXT,
    ip_address TEXT,
    country TEXT,
    city TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    PRIMARY KEY ((website_id, event_date), event_time, event_id)
) WITH CLUSTERING ORDER BY (event_time DESC);
```

## Required Fields

Every event **MUST** include these 4 required fields:

1. **`event_type`** (string) - The type of event (e.g., "click", "pageview", "scroll", "purchase")
2. **`event_name`** (string) - Specific name for the event (e.g., "button_click", "page_view", "add_to_cart")
3. **`page_url`** (string) - The URL where the event occurred
4. **`visitor_id`** (string) - UUID identifying the visitor (can be anonymous or identified)

## EventData Interface

```typescript
interface EventData {
  // Required fields
  event_type: string; // Bắt buộc
  event_name: string; // Bắt buộc
  page_url: string; // Bắt buộc
  visitor_id: string; // Bắt buộc

  // Optional core fields
  website_id?: string;
  event_date?: string; // YYYY-MM-DD (auto-generated if not provided)
  event_time?: string; // ISO timestamp (auto-generated if not provided)
  event_id?: string; // UUID (auto-generated if not provided)
  user_id?: string | null; // null for anonymous users
  session_id?: string;

  // Page and element related
  page_title?: string;
  element_selector?: string;
  element_text?: string;
  element_type?: string; // For backward compatibility
  element_id?: string; // For backward compatibility

  // Device and browser info
  device_type?: string; // desktop, mobile, tablet
  browser?: string;
  os?: string;
  user_agent?: string; // For backward compatibility

  // Location info
  ip_address?: string;
  country?: string;
  city?: string;

  // Marketing attribution
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;

  // Custom properties
  properties?: Record<string, string>; // DB schema uses MAP<TEXT, TEXT>
  metadata?: Record<string, any>; // For backward compatibility

  // Timestamp
  timestamp?: number; // For backward compatibility
}
```

## API Changes

### 1. Validation

The tracking client now validates all required fields and will throw errors if any are missing:

```typescript
// This will throw an error
tracker.track({
  event_type: "click",
  // Missing: event_name, page_url, visitor_id
});

// Error: "event_name is required"
```

### 2. Auto-generation

Missing optional fields are automatically generated:

- `event_id`: Generated UUID if not provided
- `event_date`: Current date in YYYY-MM-DD format
- `event_time`: Current timestamp in ISO format

### 3. Method Signature Updates

Convenience methods now use `visitorId` instead of `userId` to reflect the new required field:

```typescript
// Before
trackPageView(userId: string, pageUrl: string, sessionId?: string, metadata?: any)

// After
trackPageView(visitorId: string, pageUrl: string, sessionId?: string, metadata?: any)
```

## Usage Examples

### Basic Event Tracking

```typescript
const eventData: EventData = {
  event_type: "click", // Required
  event_name: "button_click", // Required
  page_url: "https://example.com/page", // Required
  visitor_id: "123e4567-e89b-12d3-a456-426614174000", // Required

  // Optional fields
  user_id: "user-123", // null for anonymous users
  session_id: "session-456",
  element_selector: "#submit-button",
  properties: {
    button_color: "blue",
    form_type: "contact",
  },
};

await tracker.track(eventData);
```

### Convenience Methods

```typescript
const visitorId = "123e4567-e89b-12d3-a456-426614174000";

// Page view
await tracker.trackPageView(visitorId, "https://example.com/home");

// Click event
await tracker.trackClick(
  visitorId,
  "button",
  "https://example.com/home",
  "cta-button"
);

// Scroll event
await tracker.trackScroll(visitorId, "https://example.com/article", 75);

// Custom event
await tracker.trackCustomEvent(
  "form_submit",
  visitorId,
  "https://example.com/contact"
);
```

### Anonymous User Tracking

```typescript
const anonymousVisitorId = "anonymous-" + generateRandomId();

const anonymousEvent: EventData = {
  event_type: "pageview",
  event_name: "anonymous_page_view",
  page_url: "https://example.com/blog/article-1",
  visitor_id: anonymousVisitorId,
  user_id: null, // null for anonymous users
  properties: {
    article_category: "tutorial",
  },
};

await tracker.track(anonymousEvent);
```

### E-commerce Tracking

```typescript
const purchaseEvent: EventData = {
  event_type: "purchase",
  event_name: "purchase_complete",
  page_url: "https://shop.example.com/checkout/success",
  visitor_id: "customer-123",
  user_id: "customer-123",
  session_id: "shopping-session-456",
  properties: {
    order_id: "ORD-123",
    total_amount: "299.99",
    currency: "USD",
    payment_method: "credit_card",
  },
};

await tracker.track(purchaseEvent);
```

## Migration Guide

### For Existing Code

1. **Update event objects** to include the 4 required fields
2. **Change `userId` parameters** to `visitorId` in convenience methods
3. **Update custom properties** to use `properties` field (Record<string, string>)
4. **Handle validation errors** for missing required fields

### Breaking Changes

- All events now require `event_type`, `event_name`, `page_url`, and `visitor_id`
- Convenience method parameters changed from `userId` to `visitorId`
- Properties must be string key-value pairs for database compatibility

### Backward Compatibility

- `metadata` field is still supported alongside `properties`
- `timestamp` field is still supported alongside `event_time`
- `element_type` and `element_id` fields are preserved
- `user_agent` field is preserved

## Error Handling

The API will throw descriptive errors for missing required fields:

```typescript
try {
  await tracker.track(incompleteEvent);
} catch (error) {
  console.error(error.message);
  // "event_name is required"
  // "page_url is required"
  // "visitor_id is required"
}
```

## Best Practices

1. **Always include required fields** in your event data
2. **Use meaningful event names** that describe the specific action
3. **Include visitor_id** for both anonymous and identified users
4. **Use properties field** for custom event attributes
5. **Include session_id** to group related events
6. **Set user_id to null** for anonymous users
7. **Include UTM parameters** for marketing attribution
8. **Add device/browser info** for analytics segmentation

// Updated tracking examples with new EventData structure
import { TrackingAPI, EventData } from "../src";

// Initialize the tracking API
const tracker = new TrackingAPI({
  apiKey: "your-api-key",
  baseUrl: "https://your-api-endpoint.com",
});

// Required fields for all events:
// - event_type (required)
// - event_name (required)
// - page_url (required)
// - visitor_id (required)

// Example 1: Basic event tracking with all required fields
async function trackBasicEvent() {
  const eventData: EventData = {
    event_type: "click", // Bắt buộc
    event_name: "button_click", // Bắt buộc
    page_url: "https://example.com/page", // Bắt buộc
    visitor_id: "123e4567-e89b-12d3-a456-426614174000", // Bắt buộc

    // Optional fields
    user_id: "user-123", // null for anonymous users
    session_id: "session-456",
    element_selector: "#submit-button",
    element_text: "Submit Form",
    device_type: "desktop",
    browser: "Chrome",
    os: "Windows",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    referrer: "https://google.com",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "summer-sale",
    properties: {
      button_color: "blue",
      form_type: "contact",
    },
  };

  try {
    await tracker.track(eventData);
    console.log("Event tracked successfully");
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}

// Example 2: Using convenience methods (automatically includes required fields)
async function trackWithConvenienceMethods() {
  const visitorId = "123e4567-e89b-12d3-a456-426614174000";
  const sessionId = "session-789";

  // Track page view
  await tracker.trackPageView(
    visitorId,
    "https://example.com/home",
    sessionId,
    { page_title: "Home Page" }
  );

  // Track button click
  await tracker.trackClick(
    visitorId,
    "button",
    "https://example.com/home",
    "cta-button",
    sessionId,
    { campaign: "header-cta" }
  );

  // Track scroll event
  await tracker.trackScroll(
    visitorId,
    "https://example.com/article",
    75,
    sessionId,
    { article_id: "123" }
  );

  // Track custom event
  await tracker.trackCustomEvent(
    "form_submit",
    visitorId,
    "https://example.com/contact",
    sessionId,
    { form_name: "contact-form" }
  );
}

// Example 3: Batch tracking with multiple events
async function trackBatchEvents() {
  const events: EventData[] = [
    {
      event_type: "pageview",
      event_name: "page_view",
      page_url: "https://example.com/product/123",
      visitor_id: "visitor-1",
      user_id: "user-1",
      session_id: "session-1",
      page_title: "Product ABC",
      properties: {
        product_id: "123",
        category: "electronics",
      },
    },
    {
      event_type: "click",
      event_name: "add_to_cart",
      page_url: "https://example.com/product/123",
      visitor_id: "visitor-1",
      user_id: "user-1",
      session_id: "session-1",
      element_selector: ".add-to-cart-btn",
      properties: {
        product_id: "123",
        price: "299.99",
        currency: "USD",
      },
    },
    {
      event_type: "purchase",
      event_name: "purchase_complete",
      page_url: "https://example.com/checkout/success",
      visitor_id: "visitor-1",
      user_id: "user-1",
      session_id: "session-1",
      properties: {
        order_id: "ORD-123",
        total_amount: "299.99",
        currency: "USD",
        payment_method: "credit_card",
      },
    },
  ];

  try {
    await tracker.trackBatch(events);
    console.log("Batch events tracked successfully");
  } catch (error) {
    console.error("Error tracking batch events:", error);
  }
}

// Example 4: E-commerce tracking
async function trackEcommerceEvents() {
  const visitorId = "ecommerce-visitor-123";
  const sessionId = "ecommerce-session-456";

  // Product view
  const productViewEvent: EventData = {
    event_type: "pageview",
    event_name: "product_view",
    page_url: "https://shop.example.com/product/smartphone-x",
    visitor_id: visitorId,
    user_id: "customer-789",
    session_id: sessionId,
    page_title: "Smartphone X - Premium Features",
    properties: {
      product_id: "smartphone-x",
      product_name: "Smartphone X",
      category: "electronics",
      subcategory: "smartphones",
      price: "599.99",
      currency: "USD",
      availability: "in_stock",
    },
  };

  // Add to cart
  const addToCartEvent: EventData = {
    event_type: "click",
    event_name: "add_to_cart",
    page_url: "https://shop.example.com/product/smartphone-x",
    visitor_id: visitorId,
    user_id: "customer-789",
    session_id: sessionId,
    element_selector: "#add-to-cart-btn",
    element_text: "Add to Cart",
    properties: {
      product_id: "smartphone-x",
      quantity: "1",
      price: "599.99",
      cart_total: "599.99",
    },
  };

  await tracker.track(productViewEvent);
  await tracker.track(addToCartEvent);
}

// Example 5: Anonymous user tracking
async function trackAnonymousUser() {
  // Generate a visitor ID for anonymous users
  const anonymousVisitorId =
    "anonymous-" + Math.random().toString(36).substr(2, 9);

  const anonymousEvent: EventData = {
    event_type: "pageview",
    event_name: "anonymous_page_view",
    page_url: "https://example.com/blog/article-1",
    visitor_id: anonymousVisitorId,
    user_id: null, // null for anonymous users
    session_id: "anonymous-session-123",
    page_title: "How to Use Our Product",
    device_type: "mobile",
    browser: "Safari",
    os: "iOS",
    properties: {
      article_category: "tutorial",
      reading_time: "5_minutes",
    },
  };

  await tracker.track(anonymousEvent);
}

// Example 6: Error handling and validation
async function handleTrackingErrors() {
  try {
    // This will throw an error because required fields are missing
    const invalidEvent: any = {
      event_type: "click",
      // Missing: event_name, page_url, visitor_id
      metadata: { some: "data" },
    };

    await tracker.track(invalidEvent);
  } catch (error) {
    console.error("Validation error:", error.message);
    // Error: "event_name is required"
  }

  try {
    // Correct way with all required fields
    const validEvent: EventData = {
      event_type: "click",
      event_name: "button_click",
      page_url: "https://example.com/page",
      visitor_id: "valid-visitor-id",
    };

    await tracker.track(validEvent);
    console.log("Valid event tracked successfully");
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

// Export examples for testing
export {
  trackBasicEvent,
  trackWithConvenienceMethods,
  trackBatchEvents,
  trackEcommerceEvents,
  trackAnonymousUser,
  handleTrackingErrors,
};

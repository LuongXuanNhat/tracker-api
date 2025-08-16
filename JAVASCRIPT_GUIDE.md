# 🟨 JavaScript Usage Guide

Hướng dẫn chi tiết sử dụng tracker-api với **JavaScript thuần** (không dùng TypeScript).

## 📦 Cài đặt

```bash
npm install tracker-api
```

## 🚀 Quick Start

### CommonJS (Node.js)

```javascript
const { init, trackPageView, trackClick } = require("tracker-api");

// Khởi tạo với cấu hình trực tiếp
init({
  apiKey: "your-api-key-here",
  baseUrl: "http://localhost:3002/api",
  timeout: 5000,
  debug: true,
});

// Tracking events
trackPageView({
  page_url: "https://example.com",
  page_title: "Home Page",
});
```

### ES6 Modules

```javascript
import { init, trackPageView, trackClick } from "tracker-api";

// Cấu hình giống như CommonJS
init({
  apiKey: "your-api-key-here",
  baseUrl: "http://localhost:3002/api",
});
```

### Browser (Script Tag)

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Include tracker-api -->
    <script src="node_modules/tracker-api/dist/index.js"></script>
  </head>
  <body>
    <script>
      // Sử dụng global TrackerAPI
      TrackerAPI.init({
        apiKey: "your-api-key",
        baseUrl: "https://your-api.com/api",
      });

      // Track events
      TrackerAPI.trackPageView({
        page_url: window.location.href,
        page_title: document.title,
      });
    </script>
  </body>
</html>
```

## ⚙️ Cấu hình

### Cấu hình cơ bản

```javascript
const { init } = require("tracker-api");

const tracker = init({
  // Required
  apiKey: "your-api-key-here", // API key của bạn
  baseUrl: "http://localhost:3002/api", // URL API backend

  // Optional
  timeout: 5000, // Timeout request (ms)
  retryAttempts: 3, // Số lần retry
  batchSize: 10, // Kích thước batch
  debug: true, // Bật debug mode
});
```

### Cấu hình theo môi trường

```javascript
// config/tracker-config.js
const environments = {
  development: {
    apiKey: "dev-api-key",
    baseUrl: "http://localhost:3002/api",
    debug: true,
    batchSize: 5,
  },
  staging: {
    apiKey: "staging-api-key",
    baseUrl: "https://staging-api.example.com/api",
    debug: true,
    batchSize: 10,
  },
  production: {
    apiKey: "prod-api-key",
    baseUrl: "https://api.example.com/api",
    debug: false,
    batchSize: 20,
  },
};

const currentEnv = process.env.NODE_ENV || "development";
const config = environments[currentEnv];

const { init } = require("tracker-api");
const tracker = init(config);

module.exports = { tracker, config };
```

### Nhiều tracker instances

```javascript
const { createTracker } = require("tracker-api");

// Tracker cho main website
const mainTracker = createTracker({
  apiKey: "main-site-key",
  baseUrl: "https://main-api.example.com/api",
});

// Tracker cho admin dashboard
const adminTracker = createTracker({
  apiKey: "admin-key",
  baseUrl: "https://admin-api.example.com/api",
});

// Sử dụng
mainTracker.trackPageView({
  page_url: "https://example.com/home",
});

adminTracker.trackClick({
  page_url: "https://admin.example.com/dashboard",
  element_selector: "#export-button",
});
```

## 📊 Tracking Events

### Page Views

```javascript
const { trackPageView } = require("tracker-api");

// Basic page view
await trackPageView({
  page_url: "https://example.com/home",
  page_title: "Home Page",
});

// With additional properties
await trackPageView({
  page_url: "https://example.com/product/123",
  page_title: "Product Details - Cool T-Shirt",
  properties: {
    product_id: "123",
    category: "clothing",
    referrer: "https://google.com",
    user_agent: "Mozilla/5.0...",
  },
});
```

### User Interactions

```javascript
const { trackClick, trackSubmit, trackChange } = require("tracker-api");

// Button clicks
await trackClick({
  page_url: "https://example.com",
  element_selector: "#signup-button",
  element_text: "Sign Up Now",
  element_id: "signup-btn",
  properties: {
    section: "header",
    campaign: "summer-sale",
    button_color: "blue",
  },
});

// Form submissions
await trackSubmit({
  page_url: "https://example.com/contact",
  element_selector: "#contact-form",
  properties: {
    form_fields: ["name", "email", "message"],
    form_type: "contact",
    validation_errors: 0,
  },
});

// Input changes
await trackChange({
  page_url: "https://example.com/form",
  element_selector: "#email-input",
  properties: {
    field_name: "email",
    field_value_length: 25,
    is_valid: true,
  },
});
```

### E-commerce Events

```javascript
const {
  trackAddToCart,
  trackPurchase,
  trackViewProduct,
  trackRemoveFromCart,
} = require("tracker-api");

// Add to cart
await trackAddToCart({
  page_url: "https://shop.example.com/product/123",
  properties: {
    product_id: "123",
    product_name: "Cool T-Shirt",
    product_category: "clothing",
    price: "29.99",
    currency: "USD",
    quantity: 2,
    variant: "Red - Large",
  },
});

// Purchase completed
await trackPurchase({
  page_url: "https://shop.example.com/checkout/success",
  properties: {
    order_id: "ORDER-789",
    total_amount: "89.97",
    currency: "USD",
    payment_method: "credit_card",
    shipping_method: "express",
    items_count: 3,
    discount_amount: "10.00",
    tax_amount: "7.20",
  },
});

// Product views
await trackViewProduct({
  page_url: "https://shop.example.com/product/456",
  properties: {
    product_id: "456",
    product_name: "Premium Jacket",
    category: "outerwear",
    price: "199.99",
    currency: "USD",
    in_stock: true,
    brand: "CoolBrand",
  },
});
```

### User Authentication

```javascript
const { trackLoginFormSubmit, trackSignupFormSubmit } = require("tracker-api");

// Login
await trackLoginFormSubmit({
  page_url: "https://example.com/login",
  properties: {
    login_method: "email",
    remember_me: true,
    login_success: true,
    user_type: "returning",
  },
});

// Signup
await trackSignupFormSubmit({
  page_url: "https://example.com/signup",
  properties: {
    signup_method: "email",
    referral_code: "FRIEND123",
    newsletter_opt_in: true,
    account_type: "free",
  },
});
```

### Search và Navigation

```javascript
const { trackSearchQuerySubmit, trackLinkClick } = require("tracker-api");

// Search
await trackSearchQuerySubmit({
  page_url: "https://example.com/search",
  properties: {
    search_query: "javascript tutorials",
    search_filters: ["free", "beginner"],
    search_results_count: 42,
    search_category: "tutorials",
  },
});

// Link clicks
await trackLinkClick({
  page_url: "https://example.com/blog",
  element_selector: "a.external-link",
  properties: {
    link_url: "https://external-site.com",
    link_text: "Learn More",
    link_type: "external",
    opens_new_tab: true,
  },
});
```

## 📦 Batch Operations

### Tracking multiple events

```javascript
const { trackBatch } = require("tracker-api");

const events = [
  {
    event_type: "pageview",
    event_name: "page_view",
    page_url: "https://example.com/page1",
    page_title: "Page 1",
    event_date: new Date().toISOString().split("T")[0],
    event_time: new Date().toISOString(),
    visitor_id: "user-123",
  },
  {
    event_type: "click",
    event_name: "button_click",
    page_url: "https://example.com/page1",
    element_selector: "#cta-button",
    element_text: "Get Started",
    event_date: new Date().toISOString().split("T")[0],
    event_time: new Date().toISOString(),
    visitor_id: "user-123",
  },
];

await trackBatch(events);
```

### Flush pending events

```javascript
const { flush } = require("tracker-api");

// Manually flush pending events
await flush();
```

## 🌐 Browser Integration

### Auto-tracking setup

```javascript
// auto-tracker.js
(function () {
  // Initialize tracker
  TrackerAPI.init({
    apiKey: "your-api-key",
    baseUrl: "https://your-api.com/api",
    debug: false,
  });

  // Auto-track page views
  TrackerAPI.trackPageView({
    page_url: window.location.href,
    page_title: document.title,
    properties: {
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    },
  });

  // Auto-track link clicks
  document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "A") {
      TrackerAPI.trackLinkClick({
        page_url: window.location.href,
        element_selector: target.id ? "#" + target.id : target.tagName,
        properties: {
          link_url: target.href,
          link_text: target.textContent,
          link_type:
            target.hostname === window.location.hostname
              ? "internal"
              : "external",
        },
      });
    }
  });

  // Auto-track form submissions
  document.addEventListener("submit", function (event) {
    const form = event.target;
    TrackerAPI.trackSubmit({
      page_url: window.location.href,
      element_selector: form.id ? "#" + form.id : "form",
      properties: {
        form_method: form.method,
        form_action: form.action,
        fields_count: form.elements.length,
      },
    });
  });
})();
```

### SPA (Single Page Application) tracking

```javascript
// spa-tracker.js
class SPATracker {
  constructor(config) {
    TrackerAPI.init(config);
    this.currentPage = window.location.href;
    this.setupRouteTracking();
  }

  setupRouteTracking() {
    // Track initial page load
    this.trackPageChange();

    // Listen for route changes
    window.addEventListener("popstate", () => {
      this.trackPageChange();
    });

    // Override pushState and replaceState
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      setTimeout(() => this.trackPageChange(), 0);
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      setTimeout(() => this.trackPageChange(), 0);
    };
  }

  trackPageChange() {
    const newPage = window.location.href;
    if (newPage !== this.currentPage) {
      TrackerAPI.trackPageView({
        page_url: newPage,
        page_title: document.title,
        properties: {
          previous_page: this.currentPage,
          navigation_type: "spa",
          timestamp: new Date().toISOString(),
        },
      });
      this.currentPage = newPage;
    }
  }
}

// Initialize SPA tracker
const spaTracker = new SPATracker({
  apiKey: "your-api-key",
  baseUrl: "https://your-api.com/api",
});
```

## 🔧 Advanced Usage

### Custom tracker class

```javascript
const { TrackingAPI } = require("tracker-api");

class CustomTracker extends TrackingAPI {
  constructor(options) {
    super(options);
    this.userId = null;
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return (
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  setUser(userId) {
    this.userId = userId;
  }

  async trackWithUser(eventData) {
    return await this.track({
      ...eventData,
      visitor_id: this.userId || "anonymous",
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });
  }

  async trackUserAction(action, properties = {}) {
    return await this.trackWithUser({
      event_type: "user_action",
      event_name: action,
      page_url: typeof window !== "undefined" ? window.location.href : "server",
      properties: {
        ...properties,
        user_id: this.userId,
        session_id: this.sessionId,
      },
    });
  }
}

// Usage
const customTracker = new CustomTracker({
  apiKey: "your-api-key",
  baseUrl: "https://your-api.com/api",
});

customTracker.setUser("user123");
customTracker.trackUserAction("profile_updated", {
  fields_changed: ["email", "phone"],
  profile_completion: "85%",
});
```

### Error handling

```javascript
const { trackPageView } = require("tracker-api");

async function safeTrackPageView(pageData) {
  try {
    const result = await trackPageView(pageData);
    console.log("✅ Page view tracked:", result);
    return result;
  } catch (error) {
    console.error("❌ Error tracking page view:", error.message);

    // Log to error service
    if (typeof window !== "undefined" && window.ErrorLogger) {
      window.ErrorLogger.log("tracker_error", {
        error: error.message,
        page_data: pageData,
        timestamp: new Date().toISOString(),
      });
    }

    return null;
  }
}

// Usage
safeTrackPageView({
  page_url: "https://example.com/about",
  page_title: "About Us",
});
```

## 📝 Examples Files

Tham khảo các file examples:

- **`examples/javascript-usage.js`** - Comprehensive JavaScript examples
- **`examples/browser-demo.html`** - Interactive browser demo
- **`examples/javascript-examples.js`** - Basic usage examples

## 🚀 Testing

```bash
# Test JavaScript examples
npm run test:js

# Open browser demo
npm run test:browser
# Sau đó mở examples/browser-demo.html trong browser
```

## 🔧 Troubleshooting

### Common issues

1. **Module not found**

   ```bash
   # Đảm bảo đã build project
   npm run build
   ```

2. **API key not working**

   ```javascript
   // Kiểm tra API key và URL
   console.log("API Key:", "your-api-key");
   console.log("API URL:", "http://localhost:3002/api");
   ```

3. **Events not sending**

   ```javascript
   // Bật debug mode
   init({
     apiKey: "your-api-key",
     baseUrl: "http://localhost:3002/api",
     debug: true, // Xem logs trong console
   });
   ```

4. **Browser compatibility**
   ```html
   <!-- Đảm bảo sử dụng đúng file -->
   <script src="node_modules/tracker-api/dist/index.js"></script>
   ```

### Debug helpers

```javascript
// Debug configuration
const debugConfig = {
  apiKey: "your-api-key",
  baseUrl: "http://localhost:3002/api",
  debug: true,
  timeout: 10000, // Longer timeout for debugging
  retryAttempts: 1, // No retries for debugging
};

init(debugConfig);

// Test connection
async function testConnection() {
  try {
    const result = await trackPageView({
      page_url: "https://example.com/test",
      page_title: "Connection Test",
    });
    console.log("✅ Connection successful:", result);
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

testConnection();
```

## 📚 Resources

- 📖 [Main README](../README.md) - Tài liệu chính
- 🔄 [Migration Guide](../MIGRATION.md) - Migrate từ phiên bản cũ
- 📊 [API Reference](../README.md#api-reference) - Chi tiết API
- 🌐 [Browser Demo](./browser-demo.html) - Interactive demo

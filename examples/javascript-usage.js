// examples/javascript-usage.js - Comprehensive JavaScript usage examples

// Example 1: Basic usage with direct configuration (recommended for JavaScript)
const {
  init,
  trackPageView,
  trackClick,
  trackSubmit,
} = require("../lib/index");

// Initialize tracker with direct configuration (no env variables needed)
const tracker = init({
  apiKey: "your-api-key-here", // Direct API key
  baseUrl: "http://localhost:3002/api", // Direct API URL
  timeout: 5000,
  retryAttempts: 3,
  batchSize: 10,
  debug: true,
});

console.log("Tracker initialized:", tracker);

// Example 2: Page tracking
async function trackPageExample() {
  try {
    const result = await trackPageView({
      page_url: "https://example.com/home",
      page_title: "Home Page",
      event_name: "page_view",
      properties: {
        referrer: "https://google.com",
        user_agent: "Mozilla/5.0...",
      },
    });
    console.log("Page view tracked:", result);
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

// Example 3: Click tracking
async function trackClickExample() {
  try {
    const result = await trackClick({
      page_url: "https://example.com/home",
      element_selector: "#signup-button",
      element_text: "Sign Up Now",
      element_id: "signup-btn",
      properties: {
        section: "header",
        campaign: "summer-sale",
      },
    });
    console.log("Click tracked:", result);
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

// Example 4: Form submission tracking
async function trackFormSubmitExample() {
  try {
    const result = await trackSubmit({
      page_url: "https://example.com/contact",
      element_selector: "#contact-form",
      properties: {
        form_type: "contact",
        fields_filled: 5,
      },
    });
    console.log("Form submission tracked:", result);
  } catch (error) {
    console.error("Error tracking form submission:", error);
  }
}

// Example 5: Multiple tracker instances
function multipleTrackersExample() {
  const { createTracker } = require("../lib/index");

  // Tracker for main site
  const mainTracker = createTracker({
    apiKey: "main-site-key",
    baseUrl: "https://main-api.example.com/api",
  });

  // Tracker for admin panel
  const adminTracker = createTracker({
    apiKey: "admin-panel-key",
    baseUrl: "https://admin-api.example.com/api",
  });

  console.log("Multiple trackers created:", { mainTracker, adminTracker });
}

// Example 6: Business-specific tracking functions
async function businessTrackingExample() {
  try {
    const {
      trackLoginFormSubmit,
      trackAddToCart,
      trackPurchase,
    } = require("../lib/index");

    // Track login
    await trackLoginFormSubmit({
      page_url: "https://example.com/login",
    });

    // Track add to cart
    await trackAddToCart({
      page_url: "https://example.com/product/123",
      properties: {
        product_id: "123",
        product_name: "Cool T-Shirt",
        price: "29.99",
        currency: "USD",
      },
    });

    // Track purchase
    await trackPurchase({
      page_url: "https://example.com/checkout/success",
      properties: {
        order_id: "ORDER-456",
        total_amount: "89.97",
        currency: "USD",
        items_count: 3,
      },
    });

    console.log("Business events tracked successfully");
  } catch (error) {
    console.error("Error tracking business events:", error);
  }
}

// Example 7: Browser environment usage (for HTML pages)
function browserUsageExample() {
  console.log(`
// For browser usage, include the script tag:
<script src="path/to/tracker-api/dist/index.js"></script>
<script>
  // Initialize tracker
  TrackerAPI.init({
    apiKey: 'your-api-key',
    baseUrl: 'https://your-api.com/api'
  });
  
  // Track page view
  TrackerAPI.trackPageView({
    page_url: window.location.href,
    page_title: document.title
  });
  
  // Track button clicks
  document.getElementById('signup-btn').addEventListener('click', function() {
    TrackerAPI.trackClick({
      page_url: window.location.href,
      element_selector: '#signup-btn',
      element_text: this.textContent
    });
  });
</script>
  `);
}

// Example 8: Environment-based configuration
function environmentConfigExample() {
  const config = {
    development: {
      apiKey: "dev-api-key",
      baseUrl: "http://localhost:3002/api",
      debug: true,
    },
    production: {
      apiKey: "prod-api-key",
      baseUrl: "https://api.yoursite.com/api",
      debug: false,
    },
  };

  const env = process.env.NODE_ENV || "development";
  const trackerConfig = config[env];

  const tracker = init(trackerConfig);
  console.log(`Tracker initialized for ${env} environment:`, tracker);
}

// Run examples
async function runExamples() {
  console.log("=== JavaScript Tracker API Examples ===\n");

  console.log("1. Basic page tracking:");
  await trackPageExample();

  console.log("\n2. Click tracking:");
  await trackClickExample();

  console.log("\n3. Form submission tracking:");
  await trackFormSubmitExample();

  console.log("\n4. Multiple trackers:");
  multipleTrackersExample();

  console.log("\n5. Business-specific tracking:");
  await businessTrackingExample();

  console.log("\n6. Browser usage example:");
  browserUsageExample();

  console.log("\n7. Environment-based configuration:");
  environmentConfigExample();
}

// Export for module usage
module.exports = {
  trackPageExample,
  trackClickExample,
  trackFormSubmitExample,
  multipleTrackersExample,
  businessTrackingExample,
  environmentConfigExample,
  runExamples,
};

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
}

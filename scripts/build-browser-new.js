// scripts/build-browser-new.js - Build script for browser version
const fs = require("fs");
const path = require("path");

// Create browser directory if it doesn't exist
const browserDir = path.join(__dirname, "../browser");
if (!fs.existsSync(browserDir)) {
  fs.mkdirSync(browserDir, { recursive: true });
}

// Read all the individual TypeScript compiled files and combine them
const distDir = path.join(__dirname, "../dist");
const browserBundlePath = path.join(browserDir, "tracker-api-bundle.js");

try {
  // Files to include (in dependency order)
  const filesToInclude = [
    "types.js",
    "tracker.enum.js",
    "base-client.js",
    "tracking-client.js",
    "customer-client.js",
    "website-client.js",
    "apikey-client.js",
    "user-client.js",
    "analytics-client.js",
    "tracking-api.js",
  ];

  let combinedCode = `
// Tracker API - Browser Bundle
(function(global) {
  'use strict';
  
  // Create a module system for browser
  var exports = {};
  var modules = {};
  var require = function(name) {
    return modules[name] || {};
  };

`;

  // Read and process each file
  for (const file of filesToInclude) {
    const filePath = path.join(distDir, file);
    if (fs.existsSync(filePath)) {
      let fileContent = fs.readFileSync(filePath, "utf8");

      // Clean up CommonJS syntax
      fileContent = fileContent
        .replace(/^"use strict";\s*/gm, "")
        .replace(/^Object\.defineProperty\(exports[^}]+}\);\s*/gm, "")
        .replace(/^exports\.__esModule\s*=\s*true;\s*/gm, "")
        .replace(
          /const\s+([\w_]+)\s*=\s*require\([^)]+\);?\s*/g,
          "// $1 imported"
        )
        .replace(/require\([^)]+\)/g, "{}");

      combinedCode += `
  // ${file}
  (function() {
    var module = { exports: {} };
    var exports = module.exports;
    
    ${fileContent}
    
    modules['${file.replace(".js", "")}'] = module.exports;
  })();
`;
    }
  }

  // Add browser-specific API
  combinedCode += `
  
  // Browser API
  var TrackerAPI = {
    // Main classes
    TrackingAPI: modules['tracking-api'].TrackingAPI,
    TrackerEnum: modules['tracker.enum'].TrackerEnum,
    
    // Global tracker
    globalTracker: null,
    
    // Initialize function
    init: function(options) {
      if (!options.apiKey) {
        console.warn('TrackerAPI: apiKey is required for browser usage');
      }
      if (!options.baseUrl) {
        console.warn('TrackerAPI: baseUrl is required for browser usage');
      }
      
      this.globalTracker = new this.TrackingAPI(options || {});
      return this.globalTracker;
    },
    
    // Get tracker
    getTracker: function() {
      if (!this.globalTracker) {
        console.warn('TrackerAPI: Please call init() first');
        return null;
      }
      return this.globalTracker;
    },
    
    // Create new tracker
    createTracker: function(options) {
      return new this.TrackingAPI(options || {});
    },
    
    // Track functions
    track: async function(eventData, immediate) {
      const tracker = this.getTracker();
      if (!tracker) return null;
      return await tracker.track(eventData, immediate);
    },
    
    trackBatch: async function(events) {
      const tracker = this.getTracker();
      if (!tracker) return null;
      return await tracker.trackBatch(events);
    },
    
    // Event-specific functions
    trackPageView: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.pageview,
        event_name: eventData.event_name || this.TrackerEnum.EventName.view_product,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackClick: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.click,
        event_name: eventData.event_name || this.TrackerEnum.EventName.button_click,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackSubmit: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.submit,
        event_name: eventData.event_name || this.TrackerEnum.EventName.contact_form_submit,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackScroll: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.scroll,
        event_name: eventData.event_name || this.TrackerEnum.EventName.scroll_to_bottom,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackChange: async function(eventData) {
      return this.track({
        event_type: this.TrackerEnum.EventType.change,
        event_name: eventData.event_name || this.TrackerEnum.EventName.form_input_change,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    // Business functions
    trackAddToCart: async function(eventData) {
      return this.trackClick({
        ...eventData,
        event_name: this.TrackerEnum.EventName.add_to_cart,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.add_to_cart_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.add_to_cart
      });
    },
    
    trackPurchase: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.purchase
      });
    },
    
    trackLoginFormSubmit: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.login_form_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.login_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.login
      });
    },
    
    trackSignupFormSubmit: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.signup_form_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.signup_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.signup
      });
    },
    
    trackSearchQuerySubmit: async function(eventData) {
      return this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.search_query_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.search_input,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.search
      });
    },
    
    flush: async function() {
      const tracker = this.getTracker();
      if (!tracker) return null;
      return await tracker.flush();
    }
  };
  
  // Make it available globally
  global.TrackerAPI = TrackerAPI;
  
  // Also expose on window for backward compatibility
  if (typeof window !== 'undefined') {
    window.TrackerAPI = TrackerAPI;
  }
  
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
`;

  // Write the combined browser bundle
  fs.writeFileSync(browserBundlePath, combinedCode, "utf8");
  console.log("✅ Browser bundle created successfully at:", browserBundlePath);
} catch (error) {
  console.error("❌ Error creating browser bundle:", error);
}

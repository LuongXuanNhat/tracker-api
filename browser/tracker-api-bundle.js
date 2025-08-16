
// Tracker API - Browser Bundle (Simplified)
(function(global) {
  'use strict';
  
  // Simple HTTP client for browser
  function makeRequest(method, url, data, headers) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      
      // Set headers
      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            resolve({ success: true, data: xhr.responseText });
          }
        } else {
          reject(new Error('HTTP ' + xhr.status + ': ' + xhr.statusText));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network error'));
      };
      
      if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  }

  // Generate simple UUID for browser
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // TrackerEnum
  const TrackerEnum = {
    EventType: {
      pageview: 'pageview',
      click: 'click',
      submit: 'submit',
      scroll: 'scroll',
      change: 'change',
      focus: 'focus',
      blur: 'blur',
      hover: 'hover',
      input: 'input',
      keydown: 'keydown',
      keyup: 'keyup',
      mouseenter: 'mouseenter',
      mouseleave: 'mouseleave',
      zoom: 'zoom'
    },
    EventName: {
      view_product: 'view_product',
      button_click: 'button_click',
      contact_form_submit: 'contact_form_submit',
      form_input_change: 'form_input_change',
      scroll_to_bottom: 'scroll_to_bottom',
      login_form_submit: 'login_form_submit',
      signup_form_submit: 'signup_form_submit',
      search_query_submit: 'search_query_submit',
      add_to_cart: 'add_to_cart',
      remove_from_cart: 'remove_from_cart',
      purchase: 'purchase',
      newsletter_subscribe: 'newsletter_subscribe',
      open_modal: 'open_modal',
      close_modal: 'close_modal',
      link_click: 'link_click',
      copy_link: 'copy_link'
    },
    ElementSelector: {
      login_button: '#login-btn, .login-button, [data-action="login"]',
      signup_button: '#signup-btn, .signup-button, [data-action="signup"]',
      search_input: '#search, .search-input, [data-role="search"]',
      add_to_cart_button: '#add-to-cart, .add-to-cart, [data-action="add-to-cart"]',
      contact_form: '#contact-form, .contact-form, [data-form="contact"]',
      modal_close: '.modal-close, .close-modal, [data-action="close-modal"]',
      profile_link: '#profile-link, .profile-link, [data-link="profile"]'
    },
    ElementText: {
      login: 'Login',
      signup: 'Sign Up',
      search: 'Search',
      add_to_cart: 'Add to Cart',
      remove: 'Remove'
    },
    PageTitle: {
      product_detail: 'Product Detail'
    }
  };

  // Simple TrackingClient
  class TrackingClient {
    constructor(options = {}) {
      this.baseUrl = options.baseUrl || '';
      this.apiKey = options.apiKey || '';
      this.timeout = options.timeout || 5000;
      this.retryAttempts = options.retryAttempts || 3;
      this.batchSize = options.batchSize || 10;
      this.batchTimeout = options.batchTimeout || 2000;
      this.debug = options.debug || false;
      
      this.eventQueue = [];
      this.batchTimer = null;
      this.visitorId = this.generateVisitorId();
    }

    generateVisitorId() {
      let visitorId = localStorage.getItem('tracker_visitor_id');
      if (!visitorId) {
        visitorId = generateUUID();
        localStorage.setItem('tracker_visitor_id', visitorId);
      }
      return visitorId;
    }

    async track(eventData, immediate = false) {
      if (this.debug) {
        console.log('TrackerAPI: Tracking event', eventData);
      }

      // Add visitor ID if not provided
      if (!eventData.visitor_id) {
        eventData.visitor_id = this.visitorId;
      }

      if (immediate) {
        return await this.sendEvent(eventData);
      } else {
        this.eventQueue.push(eventData);
        this.scheduleBatch();
        return { success: true, message: 'Event queued for batch processing' };
      }
    }

    async trackBatch(events) {
      if (this.debug) {
        console.log('TrackerAPI: Tracking batch', events);
      }

      for (const event of events) {
        if (!event.visitor_id) {
          event.visitor_id = this.visitorId;
        }
      }

      return await this.sendBatch(events);
    }

    scheduleBatch() {
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
      }

      if (this.eventQueue.length >= this.batchSize) {
        this.processBatch();
      } else {
        this.batchTimer = setTimeout(() => {
          this.processBatch();
        }, this.batchTimeout);
      }
    }

    async processBatch() {
      if (this.eventQueue.length === 0) return;

      const events = this.eventQueue.splice(0, this.batchSize);
      try {
        await this.sendBatch(events);
      } catch (error) {
        if (this.debug) {
          console.error('TrackerAPI: Batch failed', error);
        }
        // Re-queue events on failure
        this.eventQueue.unshift(...events);
      }
    }

    async sendEvent(eventData) {
      const url = `${this.baseUrl}/tracking/events`;
      const headers = {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      };

      try {
        const response = await makeRequest('POST', url, eventData, headers);
        if (this.debug) {
          console.log('TrackerAPI: Event sent successfully', response);
        }
        return response;
      } catch (error) {
        if (this.debug) {
          console.error('TrackerAPI: Failed to send event', error);
        }
        throw error;
      }
    }

    async sendBatch(events) {
      const url = `${this.baseUrl}/tracking/events/batch`;
      const headers = {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      };

      try {
        const response = await makeRequest('POST', url, { events }, headers);
        if (this.debug) {
          console.log('TrackerAPI: Batch sent successfully', response);
        }
        return response;
      } catch (error) {
        if (this.debug) {
          console.error('TrackerAPI: Failed to send batch', error);
        }
        throw error;
      }
    }

    async flush() {
      if (this.eventQueue.length > 0) {
        await this.processBatch();
      }
      return { success: true, message: 'All events flushed' };
    }
  }

  // Main TrackingAPI class
  class TrackingAPI {
    constructor(options = {}) {
      this.trackingClient = new TrackingClient(options);
    }

    async track(eventData, immediate = false) {
      return await this.trackingClient.track(eventData, immediate);
    }

    async trackBatch(events) {
      return await this.trackingClient.trackBatch(events);
    }

    async flush() {
      return await this.trackingClient.flush();
    }
  }

  // Global TrackerAPI object
  const TrackerAPI = {
    // Classes
    TrackingAPI: TrackingAPI,
    TrackerEnum: TrackerEnum,
    
    // Global tracker instance
    globalTracker: null,
    
    // Initialize
    init: function(options = {}) {
      if (!options.apiKey) {
        console.warn('TrackerAPI: apiKey is required for browser usage');
      }
      if (!options.baseUrl) {
        console.warn('TrackerAPI: baseUrl is required for browser usage');
      }
      
      this.globalTracker = new TrackingAPI(options);
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
    createTracker: function(options = {}) {
      return new TrackingAPI(options);
    },
    
    // Track functions
    track: async function(eventData, immediate = false) {
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
      return await this.track({
        event_type: this.TrackerEnum.EventType.pageview,
        event_name: eventData.event_name || this.TrackerEnum.EventName.view_product,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackClick: async function(eventData) {
      return await this.track({
        event_type: this.TrackerEnum.EventType.click,
        event_name: eventData.event_name || this.TrackerEnum.EventName.button_click,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackSubmit: async function(eventData) {
      return await this.track({
        event_type: this.TrackerEnum.EventType.submit,
        event_name: eventData.event_name || this.TrackerEnum.EventName.contact_form_submit,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackScroll: async function(eventData) {
      return await this.track({
        event_type: this.TrackerEnum.EventType.scroll,
        event_name: eventData.event_name || this.TrackerEnum.EventName.scroll_to_bottom,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    trackChange: async function(eventData) {
      return await this.track({
        event_type: this.TrackerEnum.EventType.change,
        event_name: eventData.event_name || this.TrackerEnum.EventName.form_input_change,
        event_date: eventData.event_date || new Date().toISOString().split("T")[0],
        event_time: eventData.event_time || new Date().toISOString(),
        visitor_id: "",
        ...eventData
      });
    },
    
    // Business-specific functions
    trackAddToCart: async function(eventData) {
      return await this.trackClick({
        ...eventData,
        event_name: this.TrackerEnum.EventName.add_to_cart,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.add_to_cart_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.add_to_cart
      });
    },
    
    trackPurchase: async function(eventData) {
      return await this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.purchase
      });
    },
    
    trackLoginFormSubmit: async function(eventData) {
      return await this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.login_form_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.login_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.login
      });
    },
    
    trackSignupFormSubmit: async function(eventData) {
      return await this.trackSubmit({
        ...eventData,
        event_name: this.TrackerEnum.EventName.signup_form_submit,
        element_selector: eventData.element_selector || this.TrackerEnum.ElementSelector.signup_button,
        element_text: eventData.element_text || this.TrackerEnum.ElementText.signup
      });
    },
    
    trackSearchQuerySubmit: async function(eventData) {
      return await this.trackSubmit({
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
  
  // Auto-flush on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', function() {
      if (TrackerAPI.globalTracker) {
        TrackerAPI.flush();
      }
    });
  }
  
  // Make it available globally
  global.TrackerAPI = TrackerAPI;
  
  // Also expose on window
  if (typeof window !== 'undefined') {
    window.TrackerAPI = TrackerAPI;
  }
  
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);

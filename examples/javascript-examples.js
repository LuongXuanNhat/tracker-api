// examples/javascript-examples.js - Examples for pure JavaScript usage

// Example 1: CommonJS usage (Node.js)
const { init, trackPageView, trackClick, TrackingAPI } = require('../lib/index');

// Initialize tracker
const tracker = init({
  apiKey: 'your-api-key',
  baseUrl: 'http://localhost:3002',
  debug: true
});

// Example function to track page views
async function examplePageTracking() {
  try {
    await trackPageView('user123', '/home', 'session456', {
      title: 'Home Page',
      referrer: 'https://google.com'
    });
    console.log('Page view tracked successfully');
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Example function to track user interactions
async function exampleInteractionTracking() {
  try {
    // Track button click
    await trackClick('user123', 'button', '/home', 'signup-btn', 'session456', {
      buttonText: 'Sign Up Now',
      position: 'header'
    });

    // Track custom event
    const customTracker = new TrackingAPI({
      apiKey: 'your-api-key'
    });

    await customTracker.trackCustomEvent('video_play', 'user123', '/videos', 'session456', {
      videoId: 'intro-video',
      duration: 0,
      quality: '1080p'
    });

    console.log('Interactions tracked successfully');
  } catch (error) {
    console.error('Error tracking interactions:', error);
  }
}

// Example function for advanced usage with authentication
async function exampleAdvancedUsage() {
  const api = new TrackingAPI({
    apiKey: 'your-api-key',
    baseUrl: 'http://localhost:3002'
  });

  try {
    // Login to get authentication token
    const loginResponse = await api.customers.login({
      email: 'admin@example.com',
      password: 'password123'
    });

    if (loginResponse.success && loginResponse.data) {
      const token = loginResponse.data.token;
      api.setToken(token);

      // Get websites
      const websites = await api.websites.getAll(token);
      console.log('Websites:', websites);

      // Get real-time analytics
      if (websites.data && websites.data.length > 0) {
        const websiteId = websites.data[0].id;
        const realtimeData = await api.analytics.getRealtime(token, websiteId);
        console.log('Realtime analytics:', realtimeData);
      }

      // Create a new user
      const newUser = await api.users.create({
        email: 'newuser@example.com',
        first_name: 'John',
        last_name: 'Doe'
      });
      console.log('New user created:', newUser);
    }
  } catch (error) {
    console.error('Advanced usage error:', error);
  }
}

// Example function for batch tracking
async function exampleBatchTracking() {
  const events = [
    {
      event_type: 'page_view',
      user_id: 'user123',
      page_url: '/home',
      session_id: 'session456'
    },
    {
      event_type: 'click',
      user_id: 'user123',
      page_url: '/home',
      element_type: 'button',
      element_id: 'cta-button',
      session_id: 'session456'
    },
    {
      event_type: 'scroll',
      user_id: 'user123',
      page_url: '/home',
      session_id: 'session456',
      metadata: { scrollPercentage: 75 }
    }
  ];

  try {
    const tracker = init({ apiKey: 'your-api-key' });
    await tracker.trackBatch(events);
    console.log('Batch events tracked successfully');
  } catch (error) {
    console.error('Batch tracking error:', error);
  }
}

// Run examples
if (require.main === module) {
  console.log('Running JavaScript examples...');
  
  examplePageTracking()
    .then(() => exampleInteractionTracking())
    .then(() => exampleBatchTracking())
    .then(() => exampleAdvancedUsage())
    .then(() => console.log('All examples completed'))
    .catch(error => console.error('Example error:', error));
}

module.exports = {
  examplePageTracking,
  exampleInteractionTracking,
  exampleAdvancedUsage,
  exampleBatchTracking
};

// examples/usage-examples.ts
import { init, TrackingAPI, trackPageView, trackClick } from '../src/index';

// Example 1: Basic usage with global tracker
async function basicUsage() {
  // Initialize global tracker
  const tracker = init({
    apiKey: 'your-api-key',
    baseUrl: 'http://localhost:3002',
    debug: true
  });

  // Track page view
  await trackPageView('user123', '/home', 'session456', {
    referrer: document.referrer,
    title: 'Home Page'
  });

  // Track button click
  await trackClick('user123', 'button', '/home', 'submit-btn', 'session456', {
    buttonText: 'Submit Form',
    formType: 'contact'
  });
}

// Example 2: Advanced usage with individual clients
async function advancedUsage() {
  const api = new TrackingAPI({
    apiKey: 'your-api-key',
    baseUrl: 'http://localhost:3002',
    debug: true
  });

  try {
    // Customer management
    const authResponse = await api.customers.login({
      email: 'admin@example.com',
      password: 'password123'
    });

    const token = authResponse.data?.token;
    if (token) {
      api.setToken(token);

      // Get customer websites
      const websites = await api.websites.getAll(token);
      console.log('Websites:', websites.data);

      // Get real-time analytics
      if (websites.data && websites.data.length > 0) {
        const websiteId = websites.data[0].id;
        const realtimeData = await api.analytics.getRealtime(token, websiteId);
        console.log('Realtime data:', realtimeData.data);
      }

      // Get users
      const users = await api.users.getAll(token, { limit: 10 });
      console.log('Users:', users.data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 3: Event tracking with error handling
async function trackingWithErrorHandling() {
  const tracker = init({
    apiKey: 'your-api-key',
    retryAttempts: 3,
    timeout: 5000
  });

  try {
    // Track custom events
    await tracker.trackCustomEvent('video_play', 'user123', '/video', 'session456', {
      videoId: 'video-123',
      duration: 0,
      quality: '1080p'
    });

    await tracker.trackCustomEvent('form_submit', 'user123', '/contact', 'session456', {
      formId: 'contact-form',
      fields: ['name', 'email', 'message']
    });

    // Flush pending events
    await tracker.flush();
  } catch (error) {
    console.error('Tracking failed:', error);
  }
}

// Example 4: Batch tracking
async function batchTracking() {
  const tracker = init({
    apiKey: 'your-api-key',
    batchSize: 5,
    batchTimeout: 3000
  });

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
      element_id: 'hero-cta',
      session_id: 'session456'
    },
    {
      event_type: 'scroll',
      user_id: 'user123',
      page_url: '/home',
      session_id: 'session456',
      metadata: { scrollPercentage: 50 }
    }
  ];

  await tracker.trackBatch(events);
}

// Example 5: User management
async function userManagement() {
  const api = new TrackingAPI({
    apiKey: 'your-api-key'
  });

  // Set auth token (from login response)
  api.setToken('your-auth-token');

  try {
    // Create a new user
    const newUser = await api.users.create({
      email: 'newuser@example.com',
      first_name: 'John',
      last_name: 'Doe',
      properties: {
        age: 30,
        location: 'New York'
      }
    });

    if (newUser.data) {
      const userId = newUser.data.id;

      // Get user activities
      const activities = await api.users.getActivities(api.getToken()!, userId);
      console.log('User activities:', activities.data);

      // Get user stats
      const stats = await api.users.getStats(api.getToken()!, userId);
      console.log('User stats:', stats.data);
    }
  } catch (error) {
    console.error('User management error:', error);
  }
}

// Export examples for testing
export {
  basicUsage,
  advancedUsage,
  trackingWithErrorHandling,
  batchTracking,
  userManagement
};

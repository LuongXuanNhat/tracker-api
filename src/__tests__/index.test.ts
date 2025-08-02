import { init, getTracker, createTracker, track, trackBatch, trackClick, trackView, trackPageLoad, trackScroll } from '../index';
import { TrackingAPI } from '../tracking.api';

// Mock fetch API
global.fetch = jest.fn();

describe('Tracker API Tests', () => {
  beforeEach(() => {
    // Reset globalTracker before each test
    jest.resetModules();
    // Reset fetch mock
    (global.fetch as jest.Mock).mockReset();
    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  });

  describe('init()', () => {
    it('should create a new tracker instance', () => {
      const tracker = init({ apiKey: 'test-key' });
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });

    it('should return existing tracker if already initialized', () => {
      const tracker1 = init({ apiKey: 'test-key-1' });
      const tracker2 = init({ apiKey: 'test-key-2' });
      expect(tracker1).toBe(tracker2);
    });

    it('should create new tracker when force is true', () => {
      const tracker1 = init({ apiKey: 'test-key-1' });
      const tracker2 = init({ apiKey: 'test-key-2' }, true);
      expect(tracker1).not.toBe(tracker2);
    });
  });

  describe('getTracker()', () => {
    it('should return null if tracker not initialized', () => {
      const tracker = getTracker();
      expect(tracker).toBeNull();
    });

    it('should return tracker instance if initialized', () => {
      init({ apiKey: 'test-key' });
      const tracker = getTracker();
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });
  });

  describe('createTracker()', () => {
    it('should create new independent tracker instance', () => {
      const globalTracker = init({ apiKey: 'global-key' });
      const newTracker = createTracker({ apiKey: 'new-key' });
      expect(newTracker).toBeInstanceOf(TrackingAPI);
      expect(newTracker).not.toBe(globalTracker);
    });
  });

  describe('track()', () => {
    it('should track event using global tracker', async () => {
      init({ apiKey: 'test-key' });
      const response = await track({
        userId: 'user1',
        eventType: 'custom',
        pageUrl: '/test'
      }, true);
      
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });

    it('should return null if tracker not initialized', async () => {
      const response = await track({
        userId: 'user1',
        eventType: 'custom',
        pageUrl: '/test'
      });
      expect(response).toBeNull();
    });
  });

  describe('trackBatch()', () => {
    it('should track multiple events', async () => {
      init({ apiKey: 'test-key' });
      const events = [
        { userId: 'user1', eventType: 'custom1', pageUrl: '/test1' },
        { userId: 'user2', eventType: 'custom2', pageUrl: '/test2' }
      ];
      
      const response = await trackBatch(events);
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe('trackClick()', () => {
    it('should track click event', async () => {
      init({ apiKey: 'test-key' });
      const response = await trackClick(
        'user1',
        'button',
        '/test',
        'btn-1',
        { customData: 'test' },
        true
      );
      
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe('trackView()', () => {
    it('should track view event', async () => {
      init({ apiKey: 'test-key' });
      const response = await trackView(
        'user1',
        'page',
        '/test',
        null,
        { customData: 'test' }
      );
      
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe('trackPageLoad()', () => {
    it('should track page load event', async () => {
      init({ apiKey: 'test-key' });
      const response = await trackPageLoad(
        'user1',
        '/test',
        { customData: 'test' }
      );
      
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe('trackScroll()', () => {
    it('should track scroll event', async () => {
      init({ apiKey: 'test-key' });
      const response = await trackScroll(
        'user1',
        '/test',
        50,
        { customData: 'test' }
      );
      
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors', async () => {
      init({ apiKey: 'test-key' });
      
      // Mock error response
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      await expect(track({
        userId: 'user1',
        eventType: 'custom',
        pageUrl: '/test'
      }, true)).rejects.toThrow('API Error');
    });

    it('should handle network timeout', async () => {
      init({ apiKey: 'test-key', timeout: 1000 });
      
      // Mock timeout
      (global.fetch as jest.Mock).mockImplementationOnce(() => 
        new Promise((resolve) => setTimeout(resolve, 2000))
      );

      await expect(track({
        userId: 'user1',
        eventType: 'custom',
        pageUrl: '/test'
      }, true)).rejects.toThrow();
    });
  });

  describe('Batch Processing', () => {
    it('should queue events and flush when batch size is reached', async () => {
      init({ apiKey: 'test-key', batchSize: 2 });
      
      await track({ userId: 'user1', eventType: 'custom1', pageUrl: '/test1' });
      expect(global.fetch).not.toHaveBeenCalled();
      
      await track({ userId: 'user2', eventType: 'custom2', pageUrl: '/test2' });
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should flush queue on immediate flag', async () => {
      init({ apiKey: 'test-key', batchSize: 5 });
      
      await track(
        { userId: 'user1', eventType: 'custom', pageUrl: '/test' },
        true // immediate
      );
      
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});

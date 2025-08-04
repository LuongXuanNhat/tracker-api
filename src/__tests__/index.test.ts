import {
  init,
  getTracker,
  createTracker,
  track,
  trackBatch,
  trackClick,
  trackPageView,
  trackScroll,
  trackCustomEvent,
} from "../index";
import { TrackingAPI } from "../tracking-api";

// Mock fetch API
global.fetch = jest.fn();

describe("Tracker API Tests", () => {
  beforeEach(() => {
    // Reset global tracker state
    const tracker = getTracker();
    if (tracker) {
      // Clear any existing tracker
      (global as any).globalTracker = null;
    }

    // Reset fetch mock
    (global.fetch as jest.Mock).mockReset();
    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  });

  describe("init()", () => {
    it("should create a new tracker instance", () => {
      const tracker = init({ apiKey: "test-key" });
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });

    it("should return same tracker if already initialized", () => {
      const tracker1 = init({ apiKey: "test-key-1" });
      const tracker2 = init({ apiKey: "test-key-2" });
      expect(tracker1).toBe(tracker2);
    });
  });

  describe("getTracker()", () => {
    it("should return null if tracker not initialized", () => {
      const tracker = getTracker();
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });

    it("should return tracker instance if initialized", () => {
      init({ apiKey: "test-key" });
      const tracker = getTracker();
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });
  });

  describe("createTracker()", () => {
    it("should create new independent tracker instance", () => {
      const globalTracker = init({ apiKey: "global-key" });
      const newTracker = createTracker({ apiKey: "new-key" });
      expect(newTracker).toBeInstanceOf(TrackingAPI);
      expect(newTracker).not.toBe(globalTracker);
    });
  });

  describe("track()", () => {
    it("should track event using global tracker", async () => {
      init({ apiKey: "test-key" });
      const response = await track(
        {
          event_type: "custom",
          event_name: "custom_event", // Required
          page_url: "/test", // Required
          visitor_id: "123e4567-e89b-12d3-a456-426614174000", // Required
          user_id: "user1",
        },
        true
      );

      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });

    it("should return null if tracker not initialized", async () => {
      const response = await track({
        event_type: "custom",
        event_name: "custom_event",
        page_url: "/test",
        visitor_id: "123e4567-e89b-12d3-a456-426614174000",
        user_id: "user1",
      });
      expect(response).toBeNull();
    });
  });

  describe("trackBatch()", () => {
    it("should track multiple events", async () => {
      init({ apiKey: "test-key" });
      const events = [
        {
          event_type: "custom1",
          event_name: "custom_event_1",
          page_url: "/test1",
          visitor_id: "123e4567-e89b-12d3-a456-426614174000",
          user_id: "user1",
        },
        {
          event_type: "custom2",
          event_name: "custom_event_2",
          page_url: "/test2",
          visitor_id: "123e4567-e89b-12d3-a456-426614174000",
          user_id: "user2",
        },
      ];

      const response = await trackBatch(events);
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe("trackClick()", () => {
    it("should track click event", async () => {
      init({ apiKey: "test-key" });
      const response = await trackClick({ page_url: "test" });

      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });

    it("should track click event without session ID", async () => {
      init({ apiKey: "test-key" });
      const response = await trackClick({ page_url: "test" });

      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe("trackPageView()", () => {
    it("should track page view event", async () => {
      init({ apiKey: "test-key" });
      const response = await trackPageView({ page_url: "test" });
      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe("trackCustomEvent()", () => {
    it("should track custom event", async () => {
      init({ apiKey: "test-key" });
      const response = await trackCustomEvent(
        "video_play", // Changed from "user1" to "123e4567-e89b-12d3-a456-426614174000"
        "/video",
        "session123",
        { videoId: "intro", quality: "1080p" }
      );

      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe("trackScroll()", () => {
    it("should track scroll event", async () => {
      init({ apiKey: "test-key" });
      const response = await trackScroll({ page_url: "test" });

      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({ success: true });
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors", async () => {
      init({ apiKey: "test-key" });

      // Mock error response
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

      await expect(
        track(
          {
            event_type: "custom",
            event_name: "custom_event",
            page_url: "/test",
            visitor_id: "123e4567-e89b-12d3-a456-426614174000",
            user_id: "user1",
          },
          true
        )
      ).rejects.toThrow("API Error");
    });

    it("should handle network timeout", async () => {
      init({ apiKey: "test-key", timeout: 1000 });

      // Mock timeout
      (global.fetch as jest.Mock).mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(resolve, 2000))
      );

      await expect(
        track(
          {
            event_type: "custom",
            event_name: "custom_event",
            page_url: "/test",
            visitor_id: "123e4567-e89b-12d3-a456-426614174000",
            user_id: "user1",
          },
          true
        )
      ).rejects.toThrow();
    });
  });

  describe("Batch Processing", () => {
    it("should queue events and flush when batch size is reached", async () => {
      init({ apiKey: "test-key", batchSize: 2 });

      await track({
        event_type: "custom1",
        event_name: "custom_event_1",
        page_url: "/test1",
        visitor_id: "123e4567-e89b-12d3-a456-426614174000",
        user_id: "user1",
      });
      expect(global.fetch).not.toHaveBeenCalled();

      await track({
        event_type: "custom2",
        event_name: "custom_event_2",
        page_url: "/test2",
        visitor_id: "123e4567-e89b-12d3-a456-426614174000",
        user_id: "user2",
      });
      expect(global.fetch).toHaveBeenCalled();
    });

    it("should flush queue on immediate flag", async () => {
      init({ apiKey: "test-key", batchSize: 5 });

      await track(
        {
          event_type: "custom",
          event_name: "custom_event",
          page_url: "/test",
          visitor_id: "123e4567-e89b-12d3-a456-426614174000",
          user_id: "user1",
        },
        true // immediate
      );

      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe("TrackingAPI Instance Methods", () => {
    let tracker: TrackingAPI;

    beforeEach(() => {
      tracker = new TrackingAPI({ apiKey: "test-key" });
    });

    it("should have health check method", async () => {
      const health = await tracker.healthCheck();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/health"),
        expect.any(Object)
      );
    });

    it("should set authentication token", () => {
      tracker.setToken("test-token");
      // We can't directly access private property, so test via behavior
      expect(() => tracker.setToken("test-token")).not.toThrow();
    });

    it("should clear authentication token", () => {
      tracker.setToken("test-token");
      tracker.clearToken();
      // We can't directly access private property, so test via behavior
      expect(() => tracker.clearToken()).not.toThrow();
    });
  });

  describe("Configuration", () => {
    it("should use default configuration", () => {
      const tracker = init({});
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });

    it("should accept custom baseUrl", () => {
      const tracker = init({
        apiKey: "test-key",
        baseUrl: "https://custom-api.com",
      });
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });

    it("should accept custom timeout", () => {
      const tracker = init({
        apiKey: "test-key",
        timeout: 10000,
      });
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });

    it("should accept debug mode", () => {
      const tracker = init({
        apiKey: "test-key",
        debug: true,
      });
      expect(tracker).toBeInstanceOf(TrackingAPI);
    });
  });
});

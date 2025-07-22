# Tracking Behavior User Library

A powerful and flexible library for tracking user behavior in web applications.

## Features

- Event batching for optimal performance
- Automatic retry mechanism
- Configurable timeout and batch settings
- Support for various tracking events (click, view, page load, scroll)
- Queue auto-flush on page unload
- Environment-aware configuration

## Installation

```bash
npm install track-behavior-user
```

## Quick Start

```javascript
import { init, trackPageLoad, trackClick } from "track-behavior-user";

// Initialize the tracker
init({
  apiKey: "your-api-key",
  // Optional configurations
  timeout: 5000,
  retryAttempts: 3,
  batchSize: 10,
});

// Track a page load
await trackPageLoad("user123", "https://example.com", {
  referrer: document.referrer,
});

// Track a click
await trackClick("user123", "button", "https://example.com", "submit-btn", {
  buttonText: "Submit",
});
```

## Configuration Options

| Option          | Description                           | Default |
| --------------- | ------------------------------------- | ------- |
| `apiKey`        | API key for authentication            | `null`  |
| `timeout`       | Request timeout in milliseconds       | `5000`  |
| `retryAttempts` | Number of retry attempts              | `3`     |
| `retryDelay`    | Delay between retries in milliseconds | `1000`  |
| `batchSize`     | Number of events to batch together    | `10`    |
| `batchTimeout`  | Time to wait before sending batch     | `2000`  |

## Available Methods

### Global Tracker Methods

- `init(options)`: Initialize the global tracker
- `getTracker()`: Get the global tracker instance
- `createTracker(options)`: Create a new tracker instance

### Tracking Methods

- `track(eventData, immediate)`: Track a custom event
- `trackBatch(events)`: Track multiple events at once
- `trackClick(userId, elementType, pageUrl, elementId, metadata)`: Track click events
- `trackView(userId, elementType, pageUrl, elementId, metadata)`: Track view events
- `trackPageLoad(userId, pageUrl, metadata)`: Track page load events
- `trackScroll(userId, pageUrl, scrollPercentage, metadata)`: Track scroll events

---

# Thư viện Theo dõi Hành vi Người dùng

Thư viện mạnh mẽ và linh hoạt để theo dõi hành vi người dùng trong ứng dụng web.

## Tính năng

- Gom nhóm sự kiện để tối ưu hiệu suất
- Cơ chế tự động thử lại
- Cài đặt timeout và batch có thể tùy chỉnh
- Hỗ trợ nhiều loại sự kiện theo dõi (click, xem, tải trang, cuộn)
- Tự động đẩy hàng đợi khi thoát trang
- Cấu hình theo môi trường

## Cài đặt

```bash
npm install track-behavior-user
```

## Bắt đầu nhanh

```javascript
import { init, trackPageLoad, trackClick } from "track-behavior-user";

// Khởi tạo tracker
init({
  apiKey: "your-api-key",
  // Cấu hình tùy chọn
  timeout: 5000,
  retryAttempts: 3,
  batchSize: 10,
});

// Theo dõi tải trang
await trackPageLoad("user123", "https://example.com", {
  referrer: document.referrer,
});

// Theo dõi click
await trackClick("user123", "button", "https://example.com", "submit-btn", {
  buttonText: "Submit",
});
```

## Tùy chọn cấu hình

| Tùy chọn        | Mô tả                                      | Giá trị mặc định |
| --------------- | ------------------------------------------ | ---------------- |
| `apiKey`        | Khóa API để xác thực                       | `null`           |
| `timeout`       | Thời gian chờ request (milliseconds)       | `5000`           |
| `retryAttempts` | Số lần thử lại                             | `3`              |
| `retryDelay`    | Độ trễ giữa các lần thử lại (milliseconds) | `1000`           |
| `batchSize`     | Số sự kiện được gom nhóm                   | `10`             |
| `batchTimeout`  | Thời gian chờ trước khi gửi nhóm           | `2000`           |

## Các phương thức có sẵn

### Phương thức Tracker toàn cục

- `init(options)`: Khởi tạo tracker toàn cục
- `getTracker()`: Lấy instance tracker toàn cục
- `createTracker(options)`: Tạo instance tracker mới

### Phương thức theo dõi

- `track(eventData, immediate)`: Theo dõi sự kiện tùy chỉnh
- `trackBatch(events)`: Theo dõi nhiều sự kiện cùng lúc
- `trackClick(userId, elementType, pageUrl, elementId, metadata)`: Theo dõi sự kiện click
- `trackView(userId, elementType, pageUrl, elementId, metadata)`: Theo dõi sự kiện xem
- `trackPageLoad(userId, pageUrl, metadata)`: Theo dõi sự kiện tải trang
- `trackScroll(userId, pageUrl, scrollPercentage, metadata)`: Theo dõi sự kiện cuộn

## Coming Soon

- More tracking events
- Advanced analytics features
- Real-time tracking capabilities
- Custom event filters

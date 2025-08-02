# Thư viện Theo dõi Hành vi Người dùng

Thư viện mạnh mẽ và linh hoạt để theo dõi hành vi người dùng trong ứng dụng web.

## Tính năng

- Gom nhóm sự kiện để tối ưu hiệu suất
- Cơ chế tự động thử lại khi request thất bại
- Cài đặt timeout và batch có thể tùy chỉnh
- Hỗ trợ nhiều loại sự kiện theo dõi (click, view, page load, scroll)
- Tự động đẩy hàng đợi khi thoát trang
- Cấu hình theo môi trường
- Singleton pattern để quản lý tracker toàn cục
- Khởi tạo lại tracker với tùy chọn force

## Cài đặt

```bash
npm install tracker-api
```

## Bắt đầu nhanh

```javascript
import { init, trackPageLoad, trackClick } from "tracker-api";

// Khởi tạo tracker
init({
  apiKey: "your-api-key",
  baseURL: "http://localhost:3002/api", // URL API backend
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

## Cách sử dụng với Next.js

```typescript
// app/layout.tsx
"use client";

import { useEffect } from "react";
import { init } from "tracker-api";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      init({
        apiKey: process.env.NEXT_PUBLIC_TRACKING_API_KEY,
        baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api",
      });
    }
  }, []);

  return <>{children}</>;
}

// Trong component
import { trackClick } from "tracker-api";

const handleClick = async () => {
  await trackClick("user123", "button", window.location.href, "submit-btn", {
    buttonText: "Submit",
  });
};
```

## Tùy chọn cấu hình

| Tùy chọn        | Mô tả                                      | Giá trị mặc định  |
| --------------- | ------------------------------------------ | ----------------- |
| `apiKey`        | Khóa API để xác thực                       | `null`            |
| `baseURL`       | URL API backend                            | Tự động phát hiện |
| `timeout`       | Thời gian chờ request (milliseconds)       | `5000`            |
| `retryAttempts` | Số lần thử lại                             | `3`               |
| `retryDelay`    | Độ trễ giữa các lần thử lại (milliseconds) | `1000`            |
| `batchSize`     | Số sự kiện được gom nhóm                   | `10`              |
| `batchTimeout`  | Thời gian chờ trước khi gửi nhóm           | `2000`            |

## Các phương thức có sẵn

### Phương thức quản lý Tracker

- `init(options, force)`: Khởi tạo tracker toàn cục
  - `options`: Tùy chọn cấu hình tracker
  - `force`: Buộc khởi tạo lại với options mới (mặc định: false)
- `getTracker()`: Lấy instance tracker toàn cục
- `createTracker(options)`: Tạo instance tracker mới (không dùng global)

### Phương thức theo dõi

- `track(eventData, immediate)`: Theo dõi sự kiện tùy chỉnh
- `trackBatch(events)`: Theo dõi nhiều sự kiện cùng lúc
- `trackClick(userId, elementType, pageUrl, elementId, metadata, immediate)`: Theo dõi sự kiện click
- `trackView(userId, elementType, pageUrl, elementId, metadata, immediate)`: Theo dõi sự kiện xem
- `trackPageLoad(userId, pageUrl, metadata, immediate)`: Theo dõi sự kiện tải trang
- `trackScroll(userId, pageUrl, scrollPercentage, metadata, immediate)`: Theo dõi sự kiện cuộn

## Ví dụ chi tiết

### Khởi tạo tracker với force

```javascript
// Khởi tạo lần đầu
init({ apiKey: "key1" });

// Khởi tạo lại với options mới (force = true)
init({ apiKey: "key2", timeout: 10000 }, true);
```

### Theo dõi các sự kiện

```javascript
// Theo dõi click với metadata
await trackClick(
  "user123",
  "button",
  "https://example.com/page",
  "submit-btn",
  {
    buttonText: "Gửi",
    formData: { email: "user@example.com" },
  },
  true // Gửi ngay lập tức
);

// Theo dõi cuộn trang
await trackScroll(
  "user123",
  "https://example.com/page",
  75, // 75% trang
  { section: "content" }
);

// Theo dõi nhiều sự kiện cùng lúc
await trackBatch([
  {
    userId: "user123",
    eventType: "view",
    elementType: "image",
    pageUrl: "https://example.com",
    elementId: "hero-image",
  },
  {
    userId: "user123",
    eventType: "click",
    elementType: "link",
    pageUrl: "https://example.com",
    elementId: "nav-menu",
  },
]);
```

### Sử dụng tracker riêng (không global)

```javascript
import { createTracker } from "tracker-api";

const customTracker = createTracker({
  apiKey: "custom-key",
  baseURL: "https://custom-api.com/track",
});

await customTracker.trackClick(
  "user456",
  "button",
  "https://example.com",
  "custom-btn"
);
```

## Biến môi trường

Để sử dụng với Next.js, tạo file `.env.local`:

```env
NEXT_PUBLIC_TRACKING_API_KEY=your-api-key-here
NEXT_PUBLIC_API_URL_DEV=http://localhost:3002/api
NEXT_PUBLIC_API_URL_PROD=https://your-production-api.com/api
```

## Lưu ý quan trọng

- Tracker sẽ tự động flush hàng đợi khi thoát trang
- Sự kiện được gom nhóm để tối ưu hiệu suất
- Có cơ chế retry tự động khi request thất bại
- Hỗ trợ cả môi trường server-side và client-side
- Sử dụng singleton pattern để tránh khởi tạo nhiều instance

## Sắp ra mắt

- Thêm nhiều loại sự kiện theo dõi
- Tính năng phân tích nâng cao
- Khả năng theo dõi real-time
- Bộ lọc sự kiện tùy chỉnh

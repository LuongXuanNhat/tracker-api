# Thư viện Theo dõi Hành vi Người dùng

Thư viện mạnh mẽ và linh hoạt để theo dõi hành vi người dùng trong ứng dụng web. Hỗ trợ cả **TypeScript** và **JavaScript**.

## 🌟 Tính năng

- ✅ **Đa ngôn ngữ**: Hỗ trợ cả TypeScript và JavaScript
- ✅ **Gom nhóm sự kiện**: Tối ưu hiệu suất với batch processing
- ✅ **Tự động thử lại**: Cơ chế retry thông minh khi request thất bại
- ✅ **Cấu hình linh hoạt**: Timeout và batch size có thể tùy chỉnh
- ✅ **Đa dạng sự kiện**: Click, view, page load, scroll, form submission...
- ✅ **Auto-flush**: Tự động đẩy hàng đợi khi thoát trang
- ✅ **Environment-aware**: Hỗ trợ cấu hình theo môi trường
- ✅ **Singleton pattern**: Quản lý tracker toàn cục hiệu quả
- ✅ **Browser-friendly**: Hoạt động tốt trên cả server và client side

## 📦 Cài đặt

```bash
npm install tracker-api
```

## 🚀 Bắt đầu nhanh

### TypeScript (Next.js/React)

```typescript
import { init, trackPageView, trackClick } from "tracker-api";

// Khởi tạo tracker với biến môi trường
init({
  // Sẽ tự động sử dụng process.env.NEXT_PUBLIC_TRACKING_API_KEY
  // và process.env.NEXT_PUBLIC_API_URL nếu có
  timeout: 5000,
  retryAttempts: 3,
  batchSize: 10,
});

// Theo dõi tải trang
await trackPageView({
  page_url: "https://example.com",
  page_title: "Home Page",
  properties: {
    referrer: document.referrer,
  },
});

// Theo dõi click
await trackClick({
  page_url: "https://example.com",
  element_selector: "#submit-btn",
  element_text: "Submit",
  properties: {
    buttonText: "Submit",
  },
});
```

### JavaScript (Node.js/Vanilla JS)

```javascript
// Node.js CommonJS
const { init, trackPageView, trackClick } = require("tracker-api");

// Hoặc ES6 modules
// import { init, trackPageView, trackClick } from "tracker-api";

// Khởi tạo tracker với cấu hình trực tiếp (khuyến nghị cho JS)
init({
  apiKey: "your-api-key-here", // Truyền trực tiếp API key
  baseUrl: "http://localhost:3002/api", // Truyền trực tiếp API URL
  timeout: 5000,
  retryAttempts: 3,
  batchSize: 10,
  debug: true,
});

// Theo dõi tải trang
await trackPageView({
  page_url: "https://example.com",
  page_title: "Home Page",
  properties: {
    referrer: "https://google.com",
    user_agent: "Mozilla/5.0...",
  },
});

// Theo dõi click
await trackClick({
  page_url: "https://example.com",
  element_selector: "#signup-button",
  element_text: "Sign Up Now",
  properties: {
    section: "header",
    campaign: "summer-sale",
  },
});
```

### Browser (HTML)

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="node_modules/tracker-api/browser/tracker-api-bundle.js"></script>
  </head>
  <body>
    <script>
      // Khởi tạo tracker
      TrackerAPI.init({
        apiKey: "your-api-key",
        baseUrl: "https://your-api.com/api",
      });

      // Theo dõi trang hiện tại
      TrackerAPI.trackPageView({
        page_url: window.location.href,
        page_title: document.title,
      });

      // Theo dõi click button
      document
        .getElementById("my-button")
        .addEventListener("click", function () {
          TrackerAPI.trackClick({
            page_url: window.location.href,
            element_selector: "#my-button",
            element_text: this.textContent,
          });
        });
    </script>
  </body>
</html>
```

## 🛠️ Cấu hình nâng cao

### TypeScript/Next.js với biến môi trường

Tạo file `.env.local`:

```env
NEXT_PUBLIC_TRACKING_API_KEY=your-api-key-here
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

```typescript
// app/layout.tsx
"use client";

import { useEffect } from "react";
import { init } from "tracker-api";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      init({
        // Sẽ tự động sử dụng process.env.NEXT_PUBLIC_TRACKING_API_KEY
        // và process.env.NEXT_PUBLIC_API_URL
        timeout: 5000,
        retryAttempts: 3,
        batchSize: 10,
        debug: process.env.NODE_ENV === "development",
      });
    }
  }, []);

  return <>{children}</>;
}
```

### JavaScript với cấu hình trực tiếp

```javascript
// config/tracker.js
const trackerConfig = {
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
const config = trackerConfig[env];

const { init } = require("tracker-api");
init(config);

module.exports = config;
```

### Sử dụng nhiều tracker instances

```javascript
import { createTracker } from "tracker-api";

// Tracker cho site chính
const mainTracker = createTracker({
  apiKey: "main-site-key",
  baseUrl: "https://main-api.example.com/api",
});

// Tracker cho admin panel
const adminTracker = createTracker({
  apiKey: "admin-panel-key",
  baseUrl: "https://admin-api.example.com/api",
});
```

## 📊 Các loại sự kiện hỗ trợ

### Sự kiện cơ bản

```javascript
// Page view
await trackPageView({
  page_url: "https://example.com/home",
  page_title: "Home Page",
});

// Click events
await trackClick({
  page_url: "https://example.com",
  element_selector: "#button",
  element_text: "Click me",
});

// Form events
await trackSubmit({
  page_url: "https://example.com/contact",
  element_selector: "#contact-form",
});

// Input changes
await trackChange({
  page_url: "https://example.com/form",
  element_selector: "#email-input",
});

// Scroll events
await trackScroll({
  page_url: "https://example.com",
  properties: { scroll_depth: "75%" },
});
```

### Sự kiện business-specific

```javascript
// E-commerce
await trackAddToCart({
  page_url: "https://shop.com/product/123",
  properties: {
    product_id: "123",
    product_name: "Cool T-Shirt",
    price: "29.99",
    currency: "USD",
  },
});

await trackPurchase({
  page_url: "https://shop.com/checkout/success",
  properties: {
    order_id: "ORDER-456",
    total_amount: "89.97",
    currency: "USD",
  },
});

// User actions
await trackLoginFormSubmit({
  page_url: "https://example.com/login",
});

await trackSignupFormSubmit({
  page_url: "https://example.com/signup",
});

await trackSearchQuerySubmit({
  page_url: "https://example.com/search",
  properties: {
    search_query: "javascript tutorials",
    search_results: 42,
  },
});
```

### Batch tracking

```javascript
const events = [
  {
    event_type: "pageview",
    page_url: "https://example.com/page1",
    page_title: "Page 1",
  },
  {
    event_type: "click",
    page_url: "https://example.com/page1",
    element_selector: "#button1",
  },
];

await trackBatch(events);
```

## 📝 Examples và Testing

### Chạy examples

```bash
# TypeScript examples
npm run test:ts

# JavaScript examples
npm run test:js

# Browser demo
npm run test:browser  # Mở examples/browser-demo.html
```

### Files examples có sẵn

- `examples/usage-examples.ts` - TypeScript examples
- `examples/javascript-usage.js` - JavaScript examples
- `examples/browser-demo.html` - Browser interactive demo
- `examples/updated-tracking-examples.ts` - Advanced TypeScript examples

// Trong component
import { trackClick } from "tracker-api";

const handleClick = async () => {
await trackClick("user123", "button", window.location.href, "submit-btn", {
buttonText: "Submit",
});
};

````

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
````

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

## 🔧 API Reference

### Khởi tạo

```javascript
// TypeScript/Next.js (tự động với env variables)
init(options?)

// JavaScript (cấu hình trực tiếp)
init({
  apiKey: "your-api-key",
  baseUrl: "https://api.example.com",
  timeout: 5000,
  retryAttempts: 3,
  batchSize: 10,
  debug: false
})
```

### TrackerOptions

| Option           | Type    | Mô tả                     | Mặc định  |
| ---------------- | ------- | ------------------------- | --------- |
| `apiKey`         | string  | API key để xác thực       | undefined |
| `baseUrl`        | string  | URL cơ sở của API         | undefined |
| `trackingApiKey` | string  | API key thay thế (cho JS) | undefined |
| `apiUrl`         | string  | API URL thay thế (cho JS) | undefined |
| `timeout`        | number  | Timeout cho requests (ms) | 5000      |
| `retryAttempts`  | number  | Số lần thử lại            | 3         |
| `batchSize`      | number  | Kích thước batch          | 10        |
| `debug`          | boolean | Bật debug mode            | false     |

## 🌍 Biến môi trường

### Next.js/TypeScript

Tạo file `.env.local`:

```env
# Required
NEXT_PUBLIC_TRACKING_API_KEY=your-api-key-here
NEXT_PUBLIC_API_URL=http://localhost:3002/api

# Optional - Environment specific URLs
NEXT_PUBLIC_API_URL_DEV=http://localhost:3002/api
NEXT_PUBLIC_API_URL_PROD=https://your-production-api.com/api
```

### Node.js/JavaScript

```javascript
// Không cần biến môi trường - truyền trực tiếp trong init()
const { init } = require("tracker-api");

init({
  apiKey: process.env.TRACKING_API_KEY || "your-api-key",
  baseUrl: process.env.API_URL || "http://localhost:3002/api",
});
```

## 🚨 Lưu ý quan trọng

### TypeScript Projects

- ✅ Sử dụng biến môi trường `NEXT_PUBLIC_*`
- ✅ Import từ `"tracker-api"`
- ✅ Auto-type checking với TypeScript
- ✅ Tự động fallback cho env variables

### JavaScript Projects

- ✅ Truyền trực tiếp `apiKey` và `baseUrl` trong `init()`
- ✅ Require từ `"tracker-api"` hoặc `"tracker-api/lib"`
- ✅ Không cần env variables đặc biệt
- ✅ Hoạt động tốt trong browser và Node.js

### Browser Usage

- ✅ Sử dụng file `dist/index.js`
- ✅ Access qua global `TrackerAPI`
- ✅ Cấu hình trực tiếp trong JavaScript
- ✅ Xem `examples/browser-demo.html` để tham khảo

## 🔄 Migration từ phiên bản cũ

Nếu bạn đang sử dụng phiên bản cũ:

```javascript
// Cũ ❌
trackCustomEvent('click', 'user123', 'https://example.com', 'session456', {...})

// Mới ✅
trackClick({
  page_url: 'https://example.com',
  element_selector: '#button',
  properties: {...}
})
```

Xem file `MIGRATION.md` để biết thêm chi tiết.

## 🛠️ Development

```bash
# Build project
npm run build

# Watch mode for development
npm run dev

# Run tests
npm test

# Test TypeScript examples
npm run test:ts

# Test JavaScript examples
npm run test:js

# Clean build
npm run clean
```

## 📄 Tài liệu thêm

- 📖 [Migration Guide](./MIGRATION.md) - Hướng dẫn migrate từ phiên bản cũ
- 🆕 [What's New](./TRACKING_API_UPDATES.md) - Các tính năng mới
- 📝 [TypeScript Examples](./examples/usage-examples.ts)
- 🟨 [JavaScript Examples](./examples/javascript-usage.js)
- 🌐 [Browser Demo](./examples/browser-demo.html)

## � Khắc phục lỗi thường gặp

### Browser: "exports is not defined" hoặc "TrackerAPI is not defined"

**Nguyên nhân**: Sử dụng sai file cho browser environment.

**Giải pháp**:

```html
<!-- ❌ SAI - Không dùng file này cho browser -->
<script src="node_modules/tracker-api/dist/index.js"></script>

<!-- ✅ ĐÚNG - Dùng file browser -->
<script src="node_modules/tracker-api/browser/tracker-api-bundle.js"></script>
```

**Hoặc build từ source**:

```bash
# 1. Build project trước
npm run build

# 2. Sử dụng file được tạo
# browser/tracker-api-bundle.js sẽ có sẵn sau khi build
```

### JavaScript: "Cannot find module"

**Giải pháp**:

```javascript
// ✅ Sử dụng đúng entry point cho Node.js
const { init, trackPageView } = require("tracker-api");
// Hoặc
const { init, trackPageView } = require("tracker-api/lib");
```

### TypeScript: Type errors

**Giải pháp**:

```typescript
// ✅ Import đúng types
import { TrackerOptions, EventData } from "tracker-api";
```

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề:

1. **Kiểm tra build**: `npm run build`
2. **Test với file examples**:
   - TypeScript: `examples/usage-examples.ts`
   - JavaScript: `examples/javascript-usage.js`
   - Browser: `examples/test-browser.html`
3. **Kiểm tra cấu hình** API key và URL
4. **Enable debug**: `debug: true`
5. **Kiểm tra console** cho error details

## 📂 Cấu trúc project

```
tracker-api/
├── src/                    # TypeScript source
├── dist/                   # Compiled Node.js version
├── browser/                # Browser-ready version
├── lib/                    # JavaScript wrapper
├── examples/               # Usage examples
│   ├── usage-examples.ts   # TypeScript examples
│   ├── javascript-usage.js # JavaScript examples
│   ├── test-browser.html   # Simple browser test
│   └── browser-demo.html   # Full interactive demo
└── scripts/                # Build scripts
```

## 📈 Sắp ra mắt

- 🔜 **Real-time analytics dashboard**
- 🔜 **Advanced filtering và segmentation**
- 🔜 **Webhook integrations**
- 🔜 **Custom event validation**
- 🔜 **Performance analytics**

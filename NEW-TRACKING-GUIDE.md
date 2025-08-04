# Hướng dẫn sử dụng Tracker API mới

## Tổng quan

Tracker API đã được thiết await trackPageView({
page_url: 'htawait trackClick({
page_url: 'https://yoursite.com/login',
element_selector: TrackerEnum.ElementSelector.login_button,
element_text: TrackerEnum.ElementText.login,
element_id: 'login-btn',
event_name: TrackerEnum.EventName.button_click,
session_id: 'session-uuid-456',
page_title: TrackerEnum.PageTitle.login
});site.com/products/iphone',
page_title: TrackerEnum.PageTitle.product_detail,
event_name: TrackerEnum.EventName.view_product,
session_id: 'session-uuid-456',
user_id: 'user-uuid-789', // null nếu anonymous
website_id: 'website-uuid-000',
device_type: TrackerEnum.DeviceType.desktop,i các hàm tracking cụ thể theo `TrackerEnum.EventType`, giúp việc tracking trở nên dễ dàng và tiêu chuẩn hóa hơn. Mỗi hàm đều sử dụng đầy đủ các trường trong `EventData` interface.

## Các loại hàm tracking

### 1. Hàm tracking theo EventType (TrackerEnum.EventType)

#### Các hàm cơ bản:

- `trackPageView()` - Track page view events
- `trackClick()` - Track click events
- `trackInput()` - Track input events
- `trackSubmit()` - Track form submit events
- `trackScroll()` - Track scroll events
- `trackHover()` - Track hover events
- `trackChange()` - Track change events
- `trackFocus()` - Track focus events
- `trackBlur()` - Track blur events
- `trackKeydown()` - Track keydown events
- `trackKeyup()` - Track keyup events
- `trackMouseenter()` - Track mouse enter events
- `trackMouseleave()` - Track mouse leave events
- `trackZoom()` - Track zoom events

#### Cấu trúc chung của các hàm:

```typescript
async function trackEventType(
  eventData: Partial<EventData> & {
    page_url: string; // Bắt buộc
    visitor_id: string; // Bắt buộc
    // ... các trường optional khác
  }
): Promise<TrackingResponse | null>;
```

### 2. Hàm tracking Business Events (Sử dụng nội bộ các hàm cơ bản)

#### Authentication:

- `trackLoginFormSubmit()` - Track đăng nhập
- `trackSignupFormSubmit()` - Track đăng ký

#### E-commerce:

- `trackAddToCart()` - Track thêm vào giỏ hàng
- `trackRemoveFromCart()` - Track xóa khỏi giỏ hàng
- `trackPurchase()` - Track mua hàng
- `trackViewProduct()` - Track xem sản phẩm

#### Interaction:

- `trackSearchQuerySubmit()` - Track tìm kiếm
- `trackContactFormSubmit()` - Track gửi form liên hệ
- `trackNewsletterSubscribe()` - Track đăng ký newsletter
- `trackOpenModal()` / `trackCloseModal()` - Track modal
- `trackLinkClick()` - Track click link
- `trackCopyLink()` - Track copy link

## Cách sử dụng

### 1. Khởi tạo Tracker

```typescript
import { init } from "./tracker-api";

const tracker = init({
  apiKey: "your-api-key",
  baseUrl: "https://api.yourtracking.com",
  debug: true,
});
```

### 2. Track Page View

```typescript
import { trackPageView, TrackerEnum } from "./tracker-api";

await trackPageView({
  page_url: "https://yoursite.com/products/iphone",
  visitor_id: "visitor-uuid-123",
  page_title: TrackerEnum.PageTitle.product_detail,
  event_name: TrackerEnum.EventName.view_product,
  session_id: "session-uuid-456",
  user_id: "user-uuid-789", // null nếu anonymous
  website_id: "website-uuid-000",
  device_type: TrackerEnum.DeviceType.desktop,
  browser: "Chrome",
  os: "Windows",
  country: "Vietnam",
  city: "Ho Chi Minh",
  properties: {
    product_id: "iphone-15-pro",
    product_name: "iPhone 15 Pro",
    category: "smartphones",
    price: "999",
  },
  referrer: "https://google.com",
  utm_source: "google",
  utm_medium: "organic",
  utm_campaign: "product-search",
});
```

### 3. Track Button Click

```typescript
import { trackClick, TrackerEnum } from "./tracker-api";

await trackClick({
  page_url: "https://yoursite.com/login",
  visitor_id: "visitor-uuid-123",
  element_selector: TrackerEnum.ElementSelector.login_button,
  element_text: TrackerEnum.ElementText.login,
  element_id: "login-btn",
  event_name: TrackerEnum.EventName.button_click,
  session_id: "session-uuid-456",
  page_title: TrackerEnum.PageTitle.login,
});
```

### 4. Track Form Submit

```typescript
import { trackSubmit, TrackerEnum } from "./tracker-api";

await trackSubmit({
  page_url: "https://yoursite.com/contact",
  visitor_id: "visitor-uuid-123",
  element_selector: TrackerEnum.ElementSelector.contact_form,
  event_name: TrackerEnum.EventName.contact_form_submit,
  session_id: "session-uuid-456",
  properties: {
    form_type: "contact",
    fields_filled: "5",
    submission_time: "00:02:34",
  },
});
```

### 5. Track Business Events (Shorthand functions)

```typescript
import {
  trackLoginFormSubmit,
  trackAddToCart,
  trackPurchase,
  TrackerEnum,
} from "./tracker-api";

// Login
await trackLoginFormSubmit({
  page_url: "https://yoursite.com/login",
  visitor_id: "visitor-uuid-123",
  properties: {
    login_method: "email",
    remember_me: "true",
  },
});

// Add to cart
await trackAddToCart({
  page_url: "https://yoursite.com/products/iphone",
  visitor_id: "visitor-uuid-123",
  properties: {
    product_id: "iphone-15-pro",
    product_name: "iPhone 15 Pro",
    price: "999",
    quantity: "1",
  },
});

// Purchase
await trackPurchase({
  page_url: "https://yoursite.com/checkout/success",
  visitor_id: "visitor-uuid-123",
  properties: {
    order_id: "ORDER-123456",
    total_amount: "999",
    currency: "USD",
    payment_method: "credit_card",
  },
});
```

## EventData Interface

Tất cả các hàm tracking đều sử dụng đầy đủ `EventData` interface:

```typescript
interface EventData {
  // Required fields
  event_type: string; // Tự động set theo hàm
  event_name: string; // Tự động set hoặc custom
  page_url: string; // Bắt buộc
  visitor_id: string; // Bắt buộc

  // Optional core fields
  website_id?: string;
  event_date?: string; // Tự động set nếu không có
  event_time?: string; // Tự động set nếu không có
  event_id?: string; // Tự động generate
  user_id?: string | null;
  session_id?: string;

  // Page and element related
  page_title?: string;
  element_selector?: string;
  element_text?: string;
  element_id?: string;

  // Device and browser info
  device_type?: string;
  browser?: string;
  os?: string;
  user_agent?: string;

  // Location info
  ip_address?: string;
  country?: string;
  city?: string;

  // Marketing attribution
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;

  // Custom properties
  properties?: Record<string, string>;
  metadata?: Record<string, any>;
}
```

## TrackerEnum Reference

### EventType

```typescript
TrackerEnum.EventType.click;
TrackerEnum.EventType.input;
TrackerEnum.EventType.submit;
TrackerEnum.EventType.pageview;
TrackerEnum.EventType.scroll;
TrackerEnum.EventType.hover;
// ... và các loại khác
```

### EventName

```typescript
TrackerEnum.EventName.login_form_submit;
TrackerEnum.EventName.signup_form_submit;
TrackerEnum.EventName.add_to_cart;
TrackerEnum.EventName.purchase;
TrackerEnum.EventName.view_product;
// ... và các tên khác
```

### ElementSelector

```typescript
TrackerEnum.ElementSelector.login_button; // "#login-btn"
TrackerEnum.ElementSelector.signup_button; // "#signup-btn"
TrackerEnum.ElementSelector.cart_button; // "#cart-btn"
TrackerEnum.ElementSelector.contact_form; // "#contact-form"
// ... và các selector khác
```

### DeviceType

```typescript
TrackerEnum.DeviceType.desktop;
TrackerEnum.DeviceType.mobile;
TrackerEnum.DeviceType.tablet;
TrackerEnum.DeviceType.smart_tv;
// ... và các loại khác
```

## Ưu điểm của hệ thống mới

1. **Tiêu chuẩn hóa**: Sử dụng TrackerEnum để đảm bảo tính nhất quán
2. **Type Safety**: Full TypeScript support với type checking
3. **Đầy đủ dữ liệu**: Mỗi event đều có đầy đủ trường trong EventData
4. **Dễ sử dụng**: Các hàm shorthand cho business events
5. **Tương thích ngược**: Vẫn hỗ trợ các hàm cũ
6. **Tự động hóa**: Tự động set event_type, event_date, event_time

## Migration từ hệ thống cũ

### Cũ:

```typescript
await trackPageView("/products", "session-123", { product: "iphone" });
```

### Mới:

```typescript
await trackPageView({
  page_url: "https://yoursite.com/products",
  visitor_id: "visitor-uuid-123",
  session_id: "session-123",
  properties: {
    product: "iphone",
  },
});
```

## Ví dụ đầy đủ

Xem file `examples/new-tracking-examples.ts` để có ví dụ chi tiết về cách sử dụng tất cả các hàm tracking.

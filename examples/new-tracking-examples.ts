// new-tracking-examples.ts - Ví dụ sử dụng các hàm tracking mới theo TrackerEnum

import {
  init,
  trackPageView,
  trackClick,
  trackInput,
  trackSubmit,
  trackScroll,
  trackHover,
  trackChange,
  trackFocus,
  trackBlur,
  trackKeydown,
  trackKeyup,
  trackMouseenter,
  trackMouseleave,
  trackZoom,
  // Business specific functions
  trackLoginFormSubmit,
  trackSignupFormSubmit,
  trackSearchQuerySubmit,
  trackAddToCart,
  trackRemoveFromCart,
  trackPurchase,
  trackContactFormSubmit,
  trackNewsletterSubscribe,
  trackOpenModal,
  trackCloseModal,
  trackViewProduct,
  trackLinkClick,
  trackCopyLink,
  TrackerEnum,
} from "../src/index";

// Initialize tracker
const tracker = init({
  apiKey: "your-api-key-here",
  baseUrl: "https://api.yourtracking.com",
  debug: true,
});

// Ví dụ dữ liệu cơ bản (visitor_id sẽ được tự động tạo bởi tracking-client)
const baseEventData = {
  page_url: "https://yourwebsite.com/page",
  session_id: "session-uuid-456",
  user_id: "user-uuid-789",
  website_id: "website-uuid-000",
  device_type: TrackerEnum.DeviceType.desktop,
  browser: "Chrome",
  os: "Windows",
  country: "Vietnam",
  city: "Ho Chi Minh",
};

// ===== CÁC VÍ DỤ SỬ DỤNG =====

// 1. Track Page View với đầy đủ dữ liệu
async function examplePageView() {
  await trackPageView({
    ...baseEventData,
    page_url: "https://yourwebsite.com/products/iphone",
    page_title: TrackerEnum.PageTitle.product_detail,
    event_name: TrackerEnum.EventName.view_product,
    properties: {
      product_id: "iphone-15-pro",
      product_name: "iPhone 15 Pro",
      category: "smartphones",
      price: "999",
    },
    referrer: "https://google.com/search",
    utm_source: "google",
    utm_medium: "organic",
    utm_campaign: "product-search",
  });
}

// 2. Track Button Click với TrackerEnum
async function exampleButtonClick() {
  await trackClick({
    ...baseEventData,
    page_url: "https://yourwebsite.com/login",
    element_selector: TrackerEnum.ElementSelector.login_button,
    element_text: TrackerEnum.ElementText.login,
    element_id: "login-btn",
    event_name: TrackerEnum.EventName.button_click,
    page_title: TrackerEnum.PageTitle.login,
  });
}

// 3. Track Form Input với validation
async function exampleFormInput() {
  await trackInput({
    ...baseEventData,
    page_url: "https://yourwebsite.com/signup",
    element_selector: "#email-input",
    event_name: TrackerEnum.EventName.form_input_change,
    page_title: TrackerEnum.PageTitle.signup,
    properties: {
      field_name: "email",
      field_type: "email",
      validation_status: "valid",
    },
  });
}

// 4. Track Form Submit
async function exampleFormSubmit() {
  await trackSubmit({
    ...baseEventData,
    page_url: "https://yourwebsite.com/contact",
    element_selector: TrackerEnum.ElementSelector.contact_form,
    event_name: TrackerEnum.EventName.contact_form_submit,
    page_title: TrackerEnum.PageTitle.contact,
    properties: {
      form_type: "contact",
      fields_filled: "5",
      submission_time: "00:02:34",
    },
  });
}

// 5. Track Scroll Event với percentage
async function exampleScroll() {
  await trackScroll({
    ...baseEventData,
    page_url: "https://yourwebsite.com/blog/article-1",
    event_name: TrackerEnum.EventName.scroll_to_bottom,
    properties: {
      scroll_percentage: "75",
      scroll_depth: "1500px",
      reading_time: "00:03:45",
    },
  });
}

// 6. Track Product Actions
async function exampleEcommerce() {
  // Add to cart
  await trackAddToCart({
    ...baseEventData,
    page_url: "https://yourwebsite.com/products/iphone",
    properties: {
      product_id: "iphone-15-pro",
      product_name: "iPhone 15 Pro",
      price: "999",
      quantity: "1",
      variant: "256GB Space Black",
    },
  });

  // Purchase
  await trackPurchase({
    ...baseEventData,
    page_url: "https://yourwebsite.com/checkout/success",
    properties: {
      order_id: "ORDER-123456",
      total_amount: "999",
      currency: "USD",
      payment_method: "credit_card",
      items_count: "1",
    },
  });
}

// 7. Track User Authentication
async function exampleUserAuth() {
  // Login
  await trackLoginFormSubmit({
    ...baseEventData,
    page_url: "https://yourwebsite.com/login",
    properties: {
      login_method: "email",
      remember_me: "true",
    },
  });

  // Signup
  await trackSignupFormSubmit({
    ...baseEventData,
    page_url: "https://yourwebsite.com/signup",
    properties: {
      signup_method: "email",
      referral_code: "FRIEND123",
    },
  });
}

// 8. Track Search
async function exampleSearch() {
  await trackSearchQuerySubmit({
    ...baseEventData,
    page_url: "https://yourwebsite.com/search",
    properties: {
      query: "iPhone 15 Pro",
      results_count: "24",
      search_category: "all",
      sort_by: "relevance",
    },
  });
}

// 9. Track Modal Interactions
async function exampleModal() {
  // Open modal
  await trackOpenModal({
    ...baseEventData,
    page_url: "https://yourwebsite.com/products/iphone",
    element_selector: "#size-guide-modal",
    properties: {
      modal_type: "size_guide",
      trigger_element: "size_guide_link",
    },
  });

  // Close modal
  await trackCloseModal({
    ...baseEventData,
    page_url: "https://yourwebsite.com/products/iphone",
    element_selector: ".modal .close",
    properties: {
      modal_type: "size_guide",
      close_method: "close_button",
      time_spent: "00:00:45",
    },
  });
}

// 10. Track Advanced Interactions
async function exampleAdvanced() {
  // Key press with key info
  await trackKeydown({
    ...baseEventData,
    page_url: "https://yourwebsite.com/editor",
    element_selector: "#text-editor",
    properties: {
      key: "Enter",
      ctrlKey: "false",
      shiftKey: "false",
      altKey: "false",
    },
  });

  // Hover with timing
  await trackHover({
    ...baseEventData,
    page_url: "https://yourwebsite.com/products",
    element_selector: '.product-card[data-id="123"]',
    properties: {
      hover_duration: "2500",
      product_id: "123",
    },
  });

  // Zoom event
  await trackZoom({
    ...baseEventData,
    page_url: "https://yourwebsite.com/gallery",
    properties: {
      zoom_level: "150%",
      zoom_type: "pinch",
      image_id: "gallery-image-5",
    },
  });
}

// 11. Track với Custom Properties phong phú
async function exampleCustomProperties() {
  await trackClick({
    ...baseEventData,
    page_url: "https://yourwebsite.com/dashboard",
    element_selector: "#export-button",
    element_text: "Export Report",
    event_name: TrackerEnum.EventName.button_click,
    properties: {
      report_type: "sales",
      date_range: "2024-01-01_to_2024-01-31",
      export_format: "csv",
      user_role: "admin",
      file_size: "2.5MB",
      processing_time: "00:00:15",
    },
    // Thêm metadata cho backward compatibility
    metadata: {
      feature_flag: "new_export_ui",
      ab_test_group: "variant_b",
    },
  });
}

// 12. Track Copy Link Action
async function exampleCopyLink() {
  await trackCopyLink({
    ...baseEventData,
    page_url: "https://yourwebsite.com/products/iphone",
    properties: {
      link_type: "product_share",
      copy_method: "button_click",
    },
  });
}

// 13. Track Newsletter Subscription
async function exampleNewsletter() {
  await trackNewsletterSubscribe({
    ...baseEventData,
    page_url: "https://yourwebsite.com/",
    properties: {
      subscription_source: "footer",
      email_domain: "gmail.com",
    },
  });
}

// ===== DEMO CHẠY TẤT CẢ VÍ DỤ =====
export async function runAllExamples() {
  console.log("🚀 Bắt đầu chạy tất cả ví dụ tracking...");

  try {
    await examplePageView();
    console.log("✅ Page View tracked");

    await exampleButtonClick();
    console.log("✅ Button Click tracked");

    await exampleFormInput();
    console.log("✅ Form Input tracked");

    await exampleFormSubmit();
    console.log("✅ Form Submit tracked");

    await exampleScroll();
    console.log("✅ Scroll tracked");

    await exampleEcommerce();
    console.log("✅ Ecommerce events tracked");

    await exampleUserAuth();
    console.log("✅ User Auth events tracked");

    await exampleSearch();
    console.log("✅ Search tracked");

    await exampleModal();
    console.log("✅ Modal interactions tracked");

    await exampleAdvanced();
    console.log("✅ Advanced interactions tracked");

    await exampleCustomProperties();
    console.log("✅ Custom properties tracked");

    await exampleCopyLink();
    console.log("✅ Copy link tracked");

    await exampleNewsletter();
    console.log("✅ Newsletter subscription tracked");

    console.log("🎉 Tất cả ví dụ đã chạy thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi chạy ví dụ:", error);
  }
}

// Export các function để có thể import riêng lẻ
export {
  examplePageView,
  exampleButtonClick,
  exampleFormInput,
  exampleFormSubmit,
  exampleScroll,
  exampleEcommerce,
  exampleUserAuth,
  exampleSearch,
  exampleModal,
  exampleAdvanced,
  exampleCustomProperties,
  exampleCopyLink,
  exampleNewsletter,
};

// Usage:
// import { runAllExamples } from './new-tracking-examples';
// runAllExamples();

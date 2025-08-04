export namespace TrackerEnum {
  export enum EventType {
    click = "click",
    input = "input",
    submit = "submit",
    pageview = "pageview",
    scroll = "scroll",
    hover = "hover",
    change = "change",
    focus = "focus",
    blur = "blur",
    keydown = "keydown",
    keyup = "keyup",
    mouseenter = "mouseenter",
    mouseleave = "mouseleave",
    zoom = "zoom",
  }

  export enum EventName {
    login_form_submit = "Nhập form đăng nhập",
    signup_form_submit = "Nhập form đăng ký",
    search_query_submit = "Tìm kiếm",
    newsletter_subscribe = "Đăng ký nhận bản tin",
    add_to_cart = "Thêm vào giỏ hàng",
    remove_from_cart = "Xóa khỏi giỏ hàng",
    purchase = "Mua hàng",
    contact_form_submit = "Gửi form liên hệ",
    form_input_change = "Thay đổi trường nhập liệu",
    scroll_to_bottom = "Cuộn đến cuối trang",
    open_modal = "Mở modal",
    close_modal = "Đóng modal",
    view_product = "Xem sản phẩm",
    button_click = "Nhấn nút",
    link_click = "Nhấn vào liên kết",
    copy_link = "Sao chép liên kết",
  }

  export enum PageTitle {
    home = "Trang chủ",
    login = "Đăng nhập",
    signup = "Đăng ký",
    cart = "Giỏ hàng",
    checkout = "Thanh toán",
    dashboard = "Bảng điều khiển",
    profile = "Trang cá nhân",
    product_detail = "Chi tiết sản phẩm",
    search_results = "Kết quả tìm kiếm",
    contact = "Liên hệ",
    service = "Dịch vụ",
    about = "Giới thiệu",
    terms = "Điều khoản sử dụng",
    privacy = "Chính sách bảo mật",
    faq = "Câu hỏi thường gặp",
    review = "Đánh giá",
    detail = "Chi tiết",
    settings = "Cài đặt",
  }

  export enum ElementSelector {
    login_button = "#login-btn",
    signup_button = "#signup-btn",
    cart_button = "#cart-btn",
    submit_button = "#submit-btn",
    search_input = "#search-box",
    add_to_cart_button = ".add-to-cart",
    contact_form = "#contact-form",
    modal_close = ".modal .close",
    profile_link = "a.profile",
  }

  export enum ElementText {
    login = "Đăng nhập",
    signup = "Đăng ký",
    add_to_cart = "Thêm vào giỏ hàng",
    remove = "Xóa",
    submit = "Gửi",
    search = "Tìm kiếm",
    continue = "Tiếp tục",
    cancel = "Hủy",
    contact_us = "Liên hệ",
  }

  export enum DeviceType {
    desktop = "desktop",
    mobile = "mobile",
    tablet = "tablet",
    smart_tv = "smart_tv",
    console = "console",
    wearable = "wearable",
  }
}

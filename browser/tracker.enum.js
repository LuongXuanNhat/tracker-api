(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrackerEnum = void 0;
    var TrackerEnum;
    (function (TrackerEnum) {
        let EventType;
        (function (EventType) {
            EventType["click"] = "click";
            EventType["input"] = "input";
            EventType["submit"] = "submit";
            EventType["pageview"] = "pageview";
            EventType["scroll"] = "scroll";
            EventType["hover"] = "hover";
            EventType["change"] = "change";
            EventType["focus"] = "focus";
            EventType["blur"] = "blur";
            EventType["keydown"] = "keydown";
            EventType["keyup"] = "keyup";
            EventType["mouseenter"] = "mouseenter";
            EventType["mouseleave"] = "mouseleave";
            EventType["zoom"] = "zoom";
        })(EventType = TrackerEnum.EventType || (TrackerEnum.EventType = {}));
        let EventName;
        (function (EventName) {
            EventName["login_form_submit"] = "Nh\u1EADp form \u0111\u0103ng nh\u1EADp";
            EventName["signup_form_submit"] = "Nh\u1EADp form \u0111\u0103ng k\u00FD";
            EventName["search_query_submit"] = "T\u00ECm ki\u1EBFm";
            EventName["newsletter_subscribe"] = "\u0110\u0103ng k\u00FD nh\u1EADn b\u1EA3n tin";
            EventName["add_to_cart"] = "Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng";
            EventName["remove_from_cart"] = "X\u00F3a kh\u1ECFi gi\u1ECF h\u00E0ng";
            EventName["purchase"] = "Mua h\u00E0ng";
            EventName["contact_form_submit"] = "G\u1EEDi form li\u00EAn h\u1EC7";
            EventName["form_input_change"] = "Thay \u0111\u1ED5i tr\u01B0\u1EDDng nh\u1EADp li\u1EC7u";
            EventName["scroll_to_bottom"] = "Cu\u1ED9n \u0111\u1EBFn cu\u1ED1i trang";
            EventName["open_modal"] = "M\u1EDF modal";
            EventName["close_modal"] = "\u0110\u00F3ng modal";
            EventName["view_product"] = "Xem s\u1EA3n ph\u1EA9m";
            EventName["button_click"] = "Nh\u1EA5n n\u00FAt";
            EventName["link_click"] = "Nh\u1EA5n v\u00E0o li\u00EAn k\u1EBFt";
            EventName["copy_link"] = "Sao ch\u00E9p li\u00EAn k\u1EBFt";
        })(EventName = TrackerEnum.EventName || (TrackerEnum.EventName = {}));
        let PageTitle;
        (function (PageTitle) {
            PageTitle["home"] = "Trang ch\u1EE7";
            PageTitle["login"] = "\u0110\u0103ng nh\u1EADp";
            PageTitle["signup"] = "\u0110\u0103ng k\u00FD";
            PageTitle["cart"] = "Gi\u1ECF h\u00E0ng";
            PageTitle["checkout"] = "Thanh to\u00E1n";
            PageTitle["dashboard"] = "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n";
            PageTitle["profile"] = "Trang c\u00E1 nh\u00E2n";
            PageTitle["product_detail"] = "Chi ti\u1EBFt s\u1EA3n ph\u1EA9m";
            PageTitle["search_results"] = "K\u1EBFt qu\u1EA3 t\u00ECm ki\u1EBFm";
            PageTitle["contact"] = "Li\u00EAn h\u1EC7";
            PageTitle["service"] = "D\u1ECBch v\u1EE5";
            PageTitle["about"] = "Gi\u1EDBi thi\u1EC7u";
            PageTitle["terms"] = "\u0110i\u1EC1u kho\u1EA3n s\u1EED d\u1EE5ng";
            PageTitle["privacy"] = "Ch\u00EDnh s\u00E1ch b\u1EA3o m\u1EADt";
            PageTitle["faq"] = "C\u00E2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p";
            PageTitle["review"] = "\u0110\u00E1nh gi\u00E1";
            PageTitle["detail"] = "Chi ti\u1EBFt";
            PageTitle["settings"] = "C\u00E0i \u0111\u1EB7t";
        })(PageTitle = TrackerEnum.PageTitle || (TrackerEnum.PageTitle = {}));
        let ElementSelector;
        (function (ElementSelector) {
            ElementSelector["login_button"] = "#login-btn";
            ElementSelector["signup_button"] = "#signup-btn";
            ElementSelector["cart_button"] = "#cart-btn";
            ElementSelector["submit_button"] = "#submit-btn";
            ElementSelector["search_input"] = "#search-box";
            ElementSelector["add_to_cart_button"] = ".add-to-cart";
            ElementSelector["contact_form"] = "#contact-form";
            ElementSelector["modal_close"] = ".modal .close";
            ElementSelector["profile_link"] = "a.profile";
        })(ElementSelector = TrackerEnum.ElementSelector || (TrackerEnum.ElementSelector = {}));
        let ElementText;
        (function (ElementText) {
            ElementText["login"] = "\u0110\u0103ng nh\u1EADp";
            ElementText["signup"] = "\u0110\u0103ng k\u00FD";
            ElementText["add_to_cart"] = "Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng";
            ElementText["remove"] = "X\u00F3a";
            ElementText["submit"] = "G\u1EEDi";
            ElementText["search"] = "T\u00ECm ki\u1EBFm";
            ElementText["continue"] = "Ti\u1EBFp t\u1EE5c";
            ElementText["cancel"] = "H\u1EE7y";
            ElementText["contact_us"] = "Li\u00EAn h\u1EC7";
        })(ElementText = TrackerEnum.ElementText || (TrackerEnum.ElementText = {}));
        let DeviceType;
        (function (DeviceType) {
            DeviceType["desktop"] = "desktop";
            DeviceType["mobile"] = "mobile";
            DeviceType["tablet"] = "tablet";
            DeviceType["smart_tv"] = "smart_tv";
            DeviceType["console"] = "console";
            DeviceType["wearable"] = "wearable";
        })(DeviceType = TrackerEnum.DeviceType || (TrackerEnum.DeviceType = {}));
    })(TrackerEnum || (exports.TrackerEnum = TrackerEnum = {}));
});

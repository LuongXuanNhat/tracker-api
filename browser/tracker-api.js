// browser/tracker-api.js - Browser-ready version
(function (global) {
  "use strict";

  // Import the main tracking functionality
  // This will be replaced with actual compiled code
  let TrackerAPI = {};

  // Check if we're in a module environment
  if (typeof module !== "undefined" && module.exports) {
    // Node.js/CommonJS
    try {
      TrackerAPI = require("../dist/index.js");
      module.exports = TrackerAPI;
    } catch (e) {
      console.error("Failed to load TrackerAPI for Node.js:", e);
    }
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define([], function () {
      return TrackerAPI;
    });
  } else {
    // Browser global
    global.TrackerAPI = TrackerAPI;
  }
})(
  typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : this
);

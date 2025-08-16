// scripts/build-browser.js - Build script for browser version
const fs = require("fs");
const path = require("path");

// Read the compiled Node.js version
const distPath = path.join(__dirname, "../dist/index.js");
const browserDir = path.join(__dirname, "../browser");
const browserPath = path.join(browserDir, "tracker-api.js");

try {
  // Create browser directory if it doesn't exist
  if (!fs.existsSync(browserDir)) {
    fs.mkdirSync(browserDir, { recursive: true });
  }
  // Read the compiled code
  let compiledCode = fs.readFileSync(distPath, "utf8");

  // Replace CommonJS require statements with inline imports
  // This is a simple approach - for complex projects, consider using a bundler
  compiledCode = compiledCode
    // Remove require statements (they'll be undefined in browser)
    .replace(/const\s+[\w_]+\s*=\s*require\([^)]+\);?\s*\n?/g, "")
    .replace(/require\([^)]+\)/g, "{}")
    // Replace exports.xxx = with module.exports.xxx =
    .replace(/^Object\.defineProperty\(exports[^}]+}\);?\s*\n?/gm, "")
    .replace(/exports\.__esModule\s*=\s*true;?\s*\n?/g, "");

  // Create browser-compatible wrapper
  const browserWrapper = `
// Tracker API - Browser Version
(function(global) {
  'use strict';
  
  // Replace CommonJS exports with browser globals
  var exports = {};
  var module = { exports: exports };
  
  // Include the compiled code
  ${compiledCode}
  
  // Make it available globally
  global.TrackerAPI = module.exports;
  
  // Also make individual functions available
  if (module.exports) {
    Object.keys(module.exports).forEach(function(key) {
      global.TrackerAPI[key] = module.exports[key];
    });
  }
  
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
`;

  // Write browser version
  fs.writeFileSync(browserPath, browserWrapper, "utf8");
  console.log("✅ Browser version created successfully!");
} catch (error) {
  console.error("❌ Error creating browser version:", error);
}

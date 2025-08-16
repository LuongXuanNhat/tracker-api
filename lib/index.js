// lib/index.js - JavaScript wrapper for the tracker API
// This file provides JavaScript-friendly exports

try {
  // Try to load the compiled TypeScript version
  const trackerAPI = require("../dist/index.js");
  module.exports = trackerAPI;
} catch (error) {
  console.error(
    'Could not load tracker API. Make sure to run "npm run build" first.'
  );
  throw error;
}

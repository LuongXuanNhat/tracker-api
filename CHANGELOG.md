# Changelog - Tracker API

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-01-01

### 🎉 Major Release - Complete API Refactor

### ✨ Added

#### **New Modular Architecture**

- **Customer Management Module**: Registration, login, profile management
- **Website Management Module**: Create, update, delete websites
- **API Key Management Module**: Generate, manage API keys
- **User Management Module**: Create, update, delete users
- **Analytics Module**: Real-time and historical analytics
- **Enhanced Tracking Module**: Improved event tracking with sessions

#### **New API Endpoints**

- `POST /api/customers/register` - Customer registration
- `POST /api/customers/login` - Customer authentication
- `GET /api/customers/profile` - Get customer profile
- `PUT /api/customers/profile` - Update customer profile
- `GET /api/websites` - List all websites
- `POST /api/websites` - Create new website
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `GET /api/api-keys` - List API keys
- `POST /api/api-keys` - Generate new API key
- `DELETE /api/api-keys/:id` - Delete API key
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/analytics/realtime` - Real-time analytics
- `GET /api/analytics/reports` - Historical reports
- `GET /api/health` - Health check endpoint

#### **Enhanced Features**

- **Session Tracking**: Support for session-based analytics
- **Batch Processing**: Efficient event batching with configurable limits
- **Retry Logic**: Automatic retry with exponential backoff
- **Environment Detection**: Development vs production URL handling
- **Enhanced Error Handling**: Detailed error responses and logging
- **TypeScript Support**: Full type definitions for all endpoints
- **Debug Mode**: Comprehensive logging for development

#### **New Convenience Methods**

- `trackCustomEvent()` - Track custom events with metadata
- `trackPageView()` - Enhanced page view tracking with sessions
- `trackClick()` - Enhanced click tracking with sessions
- `trackFormSubmit()` - Form submission tracking
- `trackSearch()` - Search event tracking
- `trackVideoPlay()` - Video interaction tracking
- `trackFileDownload()` - File download tracking
- `trackError()` - Error event tracking

#### **Client Architecture**

- **BaseClient**: Common HTTP client functionality
- **CustomerClient**: Customer management operations
- **WebsiteClient**: Website management operations
- **APIKeyClient**: API key management operations
- **TrackingClient**: Event tracking operations
- **UserClient**: User management operations
- **AnalyticsClient**: Analytics and reporting operations

#### **JavaScript Support**

- **CommonJS Modules**: Full CommonJS support in `/lib` directory
- **ES Modules**: Modern module support
- **Dual Entry Points**: Separate entry points for JS and TS
- **Backward Compatibility**: Legacy method support

#### **Developer Experience**

- **Usage Examples**: Comprehensive examples for TS and JS
- **Browser Examples**: HTML examples for web usage
- **Migration Guide**: Detailed migration documentation
- **API Documentation**: Complete API reference
- **Type Definitions**: Full TypeScript support

### 🔄 Changed

#### **Breaking Changes**

- **Event Data Format**: Migrated from camelCase to snake_case

  - `userId` → `user_id`
  - `eventType` → `event_type`
  - `pageUrl` → `page_url`
  - `elementType` → `element_type`
  - `elementId` → `element_id`

- **Method Signatures**: Added session ID parameter

  - `trackClick(userId, elementType, pageUrl, elementId, metadata, immediate)`
  - `trackClick(userId, elementType, pageUrl, elementId, sessionId, metadata)`

- **Package Structure**: New entry points and file organization
  - Main entry: `index.js` (was `dist/index.js`)
  - Types: `lib/index.d.ts` (was `dist/index.d.ts`)

#### **Improved Features**

- **Error Handling**: Enhanced error messages and error types
- **Configuration**: More flexible initialization options
- **Performance**: Optimized batch processing and retry logic
- **Logging**: Better debug output and error reporting

### 🐛 Fixed

- **Memory Leaks**: Fixed potential memory leaks in batch processing
- **Error Propagation**: Improved error handling and reporting
- **TypeScript Issues**: Fixed type definitions and compilation errors
- **Compatibility**: Better cross-platform compatibility

### 📚 Documentation

- **README**: Completely rewritten with new examples
- **Migration Guide**: Step-by-step migration instructions
- **API Reference**: Complete endpoint documentation
- **Examples**: Real-world usage examples for all features

### 🔧 Technical Details

#### **Dependencies**

- **Added**: `ts-node` for TypeScript execution
- **Added**: `rimraf` for clean builds
- **Updated**: Node.js requirement to >=14.0.0
- **Peer Dependency**: `axios ^1.0.0`

#### **Build System**

- **TypeScript**: Upgraded to TypeScript 5.0
- **Build Scripts**: Enhanced build and watch scripts
- **Clean Process**: Automated cleanup before builds
- **Testing**: New test scripts for both JS and TS

#### **File Structure**

```
/src              - TypeScript source files
/lib              - Compiled JavaScript files
/examples         - Usage examples
index.js          - Main JavaScript entry point
tracking-api-new.js - New API implementation
tsconfig.json     - TypeScript configuration
.gitignore        - Git ignore rules
MIGRATION.md      - Migration guide
README-NEW.md     - New documentation
```

---

## [1.0.8] - 2024-12-31

### Previous Version

- Basic tracking functionality
- Limited TypeScript support
- Simple API endpoints
- Basic error handling

---

## Migration Path

To upgrade from v1.x to v2.0:

1. **Update package**: `npm update tracker-api`
2. **Review breaking changes** in MIGRATION.md
3. **Update event data format** to snake_case
4. **Add session IDs** to tracking calls
5. **Test new features** using provided examples

For detailed migration instructions, see [MIGRATION.md](./MIGRATION.md).

---

## Future Roadmap

### v2.1.0 (Planned)

- WebSocket support for real-time events
- Advanced filtering and segmentation
- Custom dashboard widgets
- Performance monitoring integration

### v2.2.0 (Planned)

- Machine learning insights
- Automated anomaly detection
- A/B testing integration
- Advanced funnel analysis

---

## Support

For questions, issues, or feature requests:

- 📧 Email: support@tracker-api.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/tracker-api/issues)
- 📖 Docs: [Documentation](https://github.com/yourusername/tracker-api#readme)

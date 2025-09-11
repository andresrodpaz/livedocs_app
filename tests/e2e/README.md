# Live Docs E2E Tests

Complete end-to-end testing suite for the Live Docs application using Playwright.

## Setup

```bash
npm install
npm run setup
```

## Running Tests

```bash
# All tests
npm test

# Specific test suites
npm run test:auth          # Authentication tests
npm run test:dashboard     # Dashboard tests  
npm run test:editor        # Editor tests
npm run test:profile       # Profile tests
npm run test:integration   # Integration tests

# Device specific
npm run test:mobile        # Mobile devices
npm run test:desktop       # Desktop browsers

# Debug mode
npm run test:debug
npm run test:ui

# View reports
npm run test:report
```

## Test Coverage

- **Authentication**: Login, signup, error handling
- **Dashboard**: Document management, navigation, UI
- **Editor**: Text editing, toolbar, auto-save, comments
- **Sharing**: Modal, invitations, permissions
- **Profile**: User management, account settings
- **Integration**: Complete user journeys, error recovery

## File Structure

- `tests/auth/` - Authentication tests
- `tests/dashboard/` - Dashboard functionality
- `tests/editor/` - Document editor and sharing
- `tests/profile/` - User profile management
- `tests/integration/` - End-to-end flows
- `tests/helpers/` - Test utilities and mocks
- `config/` - Playwright configuration

Total: ~150 test cases covering all critical functionality.

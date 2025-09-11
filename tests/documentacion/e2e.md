# Live Docs - E2E Tests

Automated testing suite for Live Docs using Playwright.

## Quick Start

```bash
npm install
npm run setup
npm test
```

## Test Coverage

### Authentication
- Sign-in and sign-up pages
- Google OAuth login
- Error handling
- Session management

### Dashboard
- Document list display
- Create new documents
- Delete documents
- Navigation elements

### Document Editor
- Text editing and formatting
- Toolbar functionality
- Comments system
- Share modal and invitations

### User Profile
- Profile menu interactions
- Account management
- Sign-out functionality

## Commands

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run specific tests
npm run test:auth
npm run test:dashboard
npm run test:manual

# Debug mode
npm run test:debug

# View reports
npm run test:report
```

## Test Types

**Automated Tests**: Use mocked authentication for fast CI/CD execution

**Manual Tests**: Use real Google login for integration testing
```bash
npm run test:manual -- --headed
```

## Configuration

- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile browser support
- Automatic screenshots on failure
- HTML reports with traces

## Files

- `tests/basic.spec.js` - Basic smoke tests
- `tests/auth.spec.js` - Authentication flows
- `tests/dashboard.spec.js` - Dashboard functionality
- `tests/simple_manual.spec.js` - Manual login test
- `tests/helpers/auth_helpers.js` - Test utilities

## Troubleshooting

**No tests found**: Check file paths and `.spec.js` naming

**Manual test login**: Use `--headed` flag and complete Google OAuth when prompted

**Browser issues**: Run `npx playwright install --force`
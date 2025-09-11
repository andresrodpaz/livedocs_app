// Global setup for all tests
const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  console.log('Setting up E2E tests...');
  
  // Create auth directory
  const fs = require('fs').promises;
  
  try {
    await fs.mkdir('tests/auth', { recursive: true });
    console.log('Auth directory created');
  } catch (error) {
    console.log('Auth directory already exists');
  }

  // Setup authenticated state
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000/sign-in');
    
    // Simulate authenticated cookies
    await context.addCookies([
      {
        name: '__session',
        value: 'authenticated_test_token',
        domain: 'localhost',
        path: '/',
        httpOnly: true
      }
    ]);

    // Save authenticated state
    await context.storageState({ path: 'tests/auth/authenticated-state.json' });
    console.log('Authenticated state saved');

  } catch (error) {
    console.error('Error in global setup:', error);
  } finally {
    await browser.close();
  }

  console.log('Global setup completed');
}

async function globalTeardown(config) {
  console.log('Cleaning up E2E tests...');
  
  const fs = require('fs').promises;
  
  try {
    await fs.unlink('tests/auth/authenticated-state.json');
    console.log('Auth state cleaned up');
  } catch (error) {
    console.log('No auth state to clean up');
  }
  
  console.log('Global teardown completed');
}

// Test utilities
export class TestUtils {
  
  static async waitForNoLoading(page, timeout = 10000) {
    await expect(page.locator('.loading, .spinner, [aria-label*="loading"]'))
      .toHaveCount(0, { timeout });
  }

  static async captureConsoleErrors(page) {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    return () => errors;
  }

  static async clearStorage(page) {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }
}

module.exports = { globalSetup, globalTeardown };

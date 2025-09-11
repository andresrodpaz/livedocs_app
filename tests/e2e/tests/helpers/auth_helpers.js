import { expect } from '@playwright/test';


export class AuthMocks {
  
  static async mockSuccessfulGoogleAuth(page, redirectUrl = '/dashboard') {
    await page.route('**/v1/client/sign_ins**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'signin_' + Date.now(),
          status: 'complete',
          created_session_id: 'sess_' + Date.now()
        })
      });
    });

    await page.route('**/oauth/google**', async route => {
      await route.fulfill({
        status: 302,
        headers: {
          'Location': `http://localhost:3000${redirectUrl}`
        }
      });
    });
  }

  static async mockSuccessfulGoogleSignup(page, redirectUrl = '/onboarding') {
    await page.route('**/v1/client/sign_ups**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'signup_' + Date.now(),
          status: 'complete',
          created_user_id: 'user_' + Date.now()
        })
      });
    });

    await page.route('**/oauth/google**', async route => {
      await route.fulfill({
        status: 302,
        headers: {
          'Location': `http://localhost:3000${redirectUrl}`
        }
      });
    });
  }

  static async mockAuthError(page, errorCode = 'oauth_access_denied', errorMessage = 'Access denied') {
    await page.route('**/v1/client/sign_ins**', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [{
            code: errorCode,
            message: errorMessage
          }]
        })
      });
    });
  }

  static async mockActiveSession(context, userId = 'user_123') {
    await context.addCookies([
      {
        name: '__session',
        value: `sess_${userId}_${Date.now()}`,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false
      }
    ]);
  }

  static async mockSessionCheck(page, isAuthenticated = true) {
    if (isAuthenticated) {
      await page.route('**/v1/me**', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            user: {
              id: 'user_123',
              email_addresses: [{ email_address: 'test@example.com' }],
              first_name: 'Test',
              last_name: 'User'
            },
            session: {
              id: 'sess_123',
              status: 'active'
            }
          })
        });
      });
    } else {
      await page.route('**/v1/me**', async route => {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            errors: [{ code: 'authentication_invalid' }]
          })
        });
      });
    }
  }
}

export class AuthAssertions {
  
  static async expectSuccessfulLogin(page, expectedUrl = '/dashboard') {
    await page.waitForURL(`**${expectedUrl}`, { timeout: 10000 });
    await expect(page).toHaveURL(new RegExp(expectedUrl.replace('/', '\\/')));
  }

  static async expectAuthError(page) {
    const errorSelectors = [
      '.cl-formFieldError',
      '.cl-globalError',
      '[data-testid="error-message"]',
      '.error',
      '[role="alert"]'
    ];

    let errorFound = false;
    for (const selector of errorSelectors) {
      try {
        await expect(page.locator(selector)).toBeVisible({ timeout: 2000 });
        errorFound = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!errorFound) {
      throw new Error('No error message found on page');
    }
  }

  static async expectOnLoginPage(page) {
    await expect(page).toHaveURL(/sign-in/);
    await expect(page.locator('h1')).toContainText('Sign in');
  }
}

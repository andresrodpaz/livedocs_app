// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.js', '**/*.test.js'],
  timeout: 120 * 1000, // timeout global más largo para apps lentas
  use: {
    headless: false,           // abre el navegador para ver los tests
    slowMo: 50,                // ralentiza acciones para depuración
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure', // guarda traza completa del test
  },
  projects: [
    {
      name: 'chrome-real',
      use: {
        headless: false,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Chrome real
        args: [
          '--user-data-dir=C:/Users/arodr/AppData/Local/Google/Chrome/User Data', // tu perfil real
        ],
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }, // Firefox
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },  // Safari real en macOS
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 180 * 1000,    // espera hasta 3 minutos
    reuseExistingServer: true,
  },
});

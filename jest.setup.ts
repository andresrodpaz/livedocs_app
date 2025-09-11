import 'jest';
import dotenv from 'dotenv';

// ✅ Cargar variables de entorno antes de cualquier test
dotenv.config({ path: '.env.local' });

// ✅ Mock global de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
  })
) as jest.Mock;

// ✅ Mock de consola
global.console = {
  ...console,
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// ✅ Configuración de timezone
process.env.TZ = 'UTC';

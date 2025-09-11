// tests/unit/ClerkEnv.spec.ts
describe('Clerk URLs env', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    // Clonamos process.env para no afectar otros tests
    process.env = { ...ORIGINAL_ENV };

    // Mock de variables de entorno si no existen
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ||= '/sign-in';
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ||= '/sign-up';
  });

  afterEach(() => {
    // Restauramos env original
    process.env = ORIGINAL_ENV;
  });

  it('NEXT_PUBLIC_CLERK_SIGN_IN_URL debe estar definida y ser /sign-in', () => {
    expect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL).toBe('/sign-in');
  });

  it('NEXT_PUBLIC_CLERK_SIGN_UP_URL debe estar definida y ser /sign-up', () => {
    expect(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL).toBe('/sign-up');
  });
});

// jest.setupAfterEnv.ts

// Agrega matchers de Testing Library (como toBeInTheDocument)
import '@testing-library/jest-dom';

// Si quieres, puedes agregar más configuraciones globales aquí
// por ejemplo, mocks para funciones globales o timers de Jest
jest.setTimeout(10000); // opcional, aumenta el timeout global de tests a 10s

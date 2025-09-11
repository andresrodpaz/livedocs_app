# Workflow CI/CD para Shared Docs App

## Objetivo
Garantizar la calidad y confiabilidad de toda la aplicación mediante integración continua, ejecutando pruebas automatizadas y generando reportes de cobertura en cada push y pull request.

## Flujo del pipeline

1. **Checkout del código**
   - Descarga el código fuente del repositorio en el runner.

2. **Configuración de Node.js**
   - Instala la versión especificada de Node.js para asegurar compatibilidad.

3. **Instalación de dependencias**
   - Ejecuta `npm ci` para instalar dependencias de manera limpia y reproducible.

4. **Ejecución de tests unitarios e integración**
   - Ejecuta `npm run test -- --coverage` para validar la lógica de negocio, componentes y API.
   - Genera reporte de cobertura en la carpeta `/coverage`.

5. **Subida de artefactos de cobertura**
   - Sube el reporte de cobertura como artefacto para revisión y auditoría.

6. **Instalación de navegadores para Playwright**
   - Ejecuta `npx playwright install` para preparar el entorno de pruebas E2E.

7. **Ejecución de tests E2E**
   - Ejecuta `npx playwright test` para validar flujos completos de usuario y UI.

8. **Subida de artefactos de Playwright**
   - Sube el reporte visual de Playwright como artefacto para revisión.

## Cobertura

- **Unitarios:** Componentes, hooks, utilidades, lógica de negocio.
- **Integración:** Flujos entre módulos, API, roles y permisos.
- **E2E:** Flujos de usuario, navegación, edición colaborativa, errores, accesibilidad, rendimiento.
- **Seguridad y concurrencia:** Validación de edge cases y escenarios críticos.

## Artefactos generados

- `coverage-report`: Reporte HTML de cobertura de Jest.
- `playwright-report`: Reporte visual de Playwright.

## Ejemplo de archivo YAML

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: development
      TEST_ENV: true
      COVERAGE: true
      CI: true
      GIT_PIPELINE: true

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run unit and integration tests
        run: npm run test -- --coverage

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

      - name: Run Playwright install
        run: npx playwright install

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

## Buenas prácticas

- Mantener la cobertura por encima del 90%.
- Revisar artefactos en cada ejecución.
- Actualizar dependencias y versiones de Node.js según necesidades del proyecto.
- Documentar y versionar el workflow junto con el código fuente.

---

**Este workflow asegura la calidad de toda la aplicación, no solo de un componente, y es adecuado para equipos QA senior y auditoría.**

# Estrategia de Testing y Cobertura

## Objetivo
Garantizar la calidad y confiabilidad del producto cubriendo el 100% de las funcionalidades con tests automatizados.

## Tipos de tests

- **Unitarios:** Validan funciones, hooks y componentes aislados.
- **Integración:** Verifican el funcionamiento conjunto de varios módulos/componentes.
- **End-to-End (E2E):** Simulan el flujo completo de usuario en la aplicación.

## Herramientas

- **Jest:** Para unitarios e integración.
- **React Testing Library:** Para componentes React.
- **Playwright:** Para E2E y automatización UI.

## Cobertura

- **Componentes:** Header, ToolbarPlugin, CollaborativeRoom, Divider.
- **Hooks:** useActiveBlock.
- **Acciones:** getDocument, getClerkUsers.
- **Utilidades:** cn, $isTextNode.
- **Páginas:** Document.
- **Flujos UI:** Navegación, edición, acceso, renderizado.

## CI/CD

- Integración con pipelines (Azure DevOps/GitHub Actions).
- Ejecución automática en cada push/pull request.
- Reportes de cobertura y fallos.

## Mejores prácticas

- Tests descriptivos y documentados.
- Mocks para dependencias externas.
- Separación por tipo de test.
- Actualización continua de tests ante cambios de código.

## Ejecución

- Unitarios/integración: `npx jest`
- E2E: `npx playwright test`

## Contacto

Para dudas o mejoras, contactar al equipo QA.

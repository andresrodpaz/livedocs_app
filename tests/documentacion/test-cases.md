# Casos de Test Automatizados y Manuales

## Casos Automatizados (Playwright + Jest)

### Flujos de usuario
- Registro y login (sign-in, sign-up)
- Navegación principal y acceso a documentos
- Edición colaborativa en tiempo real (multiusuario)
- Restricción de edición según rol (editor/viewer)
- Cambio de formato, color, tamaño y tipo de bloque en el editor
- Manejo de errores: documento inexistente, usuario no autenticado, sin permisos

### API
- getDocument: éxito, error, documento no encontrado
- getClerkUsers: éxito, error, sin usuarios
- Validación de roles y permisos en la API

### Seguridad y rendimiento
- Prevención de XSS/inyección en UI y utilidades
- Pruebas de concurrencia y edición masiva
- Pruebas de rendimiento en Toolbar y Header

### Variables de entorno y configuración
- Validación de claves y URLs en .env.local

---

## Casos de Test Manuales

- Prueba de registro y login con datos válidos e inválidos
- Navegación entre páginas y comprobación de redirecciones
- Edición simultánea de un documento desde dos navegadores
- Verificación visual de cambios de formato y color en el editor
- Intento de edición como viewer (debe estar bloqueado)
- Acceso a documento inexistente (debe mostrar error o redirigir)
- Prueba de desconexión y reconexión en sesión colaborativa
- Prueba de carga masiva de usuarios en una sala
- Validación de mensajes de error y notificaciones

---

## User Cases Cubiertos

- Usuario nuevo se registra y accede a la app
- Usuario accede a un documento y edita junto a otros
- Usuario con rol viewer solo puede ver, no editar
- Usuario intenta acceder a documento sin permisos
- Usuario navega entre documentos y páginas principales
- Usuario recibe feedback visual y mensajes de error

---

## Test Plan

1. **Preparación del entorno**
   - Configurar variables en `.env.local`
   - Ejecutar migraciones y seed de datos si aplica

2. **Ejecución de tests automatizados**
   - Unitarios: `npm run test`
   - Integración: `npm run test`
   - E2E: `npx playwright test`

3. **Ejecución de tests manuales**
   - Seguir los casos manuales listados arriba
   - Documentar resultados y capturas de pantalla

4. **Revisión de cobertura**
   - Generar reporte con `npm run test -- --coverage`
   - Validar que la cobertura sea >= 90%

5. **Revisión en CI/CD**
   - Verificar que los workflows de GitHub Actions pasen correctamente

6. **Reporte y documentación**
   - Registrar bugs, mejoras y resultados en el README de QA

---

## Notas

- Todos los flujos críticos están cubiertos por tests automatizados y manuales.
- El plan de pruebas se actualiza en cada release y sprint.
- La documentación está disponible para todo el equipo de desarrollo y QA.

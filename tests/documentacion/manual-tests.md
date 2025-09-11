# Pruebas Manuales

## Registro y Login
1. Accede a `/sign-up` y registra un usuario nuevo.
2. Accede a `/sign-in` y entra con usuario existente.
3. Prueba credenciales inválidas y verifica mensajes de error.

## Navegación
1. Haz clic en el logo para volver al home.
2. Navega entre documentos usando la barra de navegación.

## Edición Colaborativa
1. Abre el mismo documento en dos navegadores.
2. Escribe texto en uno y verifica que aparece en el otro.
3. Cambia formato, color y tamaño y verifica sincronización.

## Roles y Permisos
1. Accede como viewer y verifica que no puedes editar.
2. Accede como editor y verifica que puedes editar.

## Manejo de Errores
1. Accede a un documento inexistente y verifica redirección o mensaje de error.
2. Cierra sesión y accede a un documento, verifica redirección a login.

## Concurrencia y Rendimiento
1. Agrega muchos usuarios a una sala y verifica que la app sigue respondiendo.
2. Realiza cambios rápidos en el editor y verifica que no hay retrasos.

## Seguridad
1. Intenta inyectar código en campos de texto y verifica que no se ejecuta.
2. Verifica que los datos sensibles no se muestran en la UI.

---

**Registra los resultados y adjunta capturas en el reporte de QA.**

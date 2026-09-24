export const environment = {
  production: true,
  apiBaseUrl: 'https://ar-sa.com.mx',
  // Backend de la familia Nexus (workspace).
  // PRODUCCIÓN: cadena vacía => llamadas RELATIVAS /api/... (same-origin).
  // nginx proxya /api/* a https://nube.ar-sa.com.mx:8444 y /api/send-diagnostic
  // al Express de correo (127.0.0.1:3001). Igual que dev con `ng serve`.
  // Evita CORS y el problema de conexión cross-origin que dejaba el tab
  // Paquetes atorado en "Cargando planes disponibles..." (el fetch nunca
  // terminaba aunque el navegador recibiera la respuesta).
  // Alternativa sin proxy: 'https://nube.ar-sa.com.mx:8444' (solo sirve desde
  // el origen https://ar-sa.com.mx, sin www).
  workspaceApiBaseUrl: '',
  // TODO(validacion): los productos tribufi, cardsstudio, cobrafacil y
  // scriptura están OCULTOS en producción.
  // Cuando un desarrollador valide que están listos, cambie esta línea a
  // `mostrarProductosPendientes: true` y aparecerán en el siguiente deploy
  // (tarjetas del Ecosistema + rutas /tribufi, /cardsstudio, /cobrafacil,
  // /scriptura).
  mostrarProductosPendientes: false,
};
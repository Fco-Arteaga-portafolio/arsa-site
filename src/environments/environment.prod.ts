export const environment = {
  production: true,
  apiBaseUrl: 'https://ar-sa.com.mx',
  // Backend de la familia Nexus (workspace). Llamada directa al backend real.
  // El backend envía CORS únicamente para el origen https://ar-sa.com.mx
  // (sin www). Para cubrir también www: opción (a) en nginx:
  //   location /api/ { proxy_pass https://nube.ar-sa.com.mx:8444; }
  // y dejar esto en '' (same-origin), u opción (b) agregar
  // https://www.ar-sa.com.mx al CORS del backend.
  workspaceApiBaseUrl: 'https://nube.ar-sa.com.mx:8444',
  // TODO(validacion): los productos tribufi, cardsstudio, cobrafacil y
  // scriptura están OCULTOS en producción.
  // Cuando un desarrollador valide que están listos, cambie esta línea a
  // `mostrarProductosPendientes: true` y aparecerán en el siguiente deploy
  // (tarjetas del Ecosistema + rutas /tribufi, /cardsstudio, /cobrafacil,
  // /scriptura).
  mostrarProductosPendientes: false,
};
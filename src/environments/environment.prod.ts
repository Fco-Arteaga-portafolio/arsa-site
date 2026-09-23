export const environment = {
  production: true,
  apiBaseUrl: 'https://ar-sa.com.mx',
  // TODO(validacion): los productos tribufi, cardsstudio, cobrafacil y
  // scriptura están OCULTOS en producción.
  // Cuando un desarrollador valide que están listos, cambie esta línea a
  // `mostrarProductosPendientes: true` y aparecerán en el siguiente deploy
  // (tarjetas del Ecosistema + rutas /tribufi, /cardsstudio, /cobrafacil,
  // /scriptura).
  mostrarProductosPendientes: false,
};
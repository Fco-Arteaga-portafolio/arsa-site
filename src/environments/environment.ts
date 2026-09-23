export const environment = {
  production: false,
  apiBaseUrl: 'https://ar-sa.com.mx',
  // Productos FÁCIL en validación (tribufi, cardsstudio, cobrafacil, scriptura).
  // Ocultos tanto en desarrollo como en producción hasta validarlos.
  // Para validarlos localmente, cambie esta línea a true (igual comportamiento
  // que environment.prod.ts para el deploy).
  mostrarProductosPendientes: false,
};
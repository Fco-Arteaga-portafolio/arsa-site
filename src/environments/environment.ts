export const environment = {
  production: false,
  apiBaseUrl: 'https://ar-sa.com.mx',
  // Productos FÁCIL en validación (tribufi, cardsstudio, cobrafacil, scriptura).
  // En local (ng serve) se muestran para que un desarrollador los valide.
  // En producción están ocultos: la flag vive en environment.prod.ts.
  mostrarProductosPendientes: true,
};
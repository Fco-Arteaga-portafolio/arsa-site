export const environment = {
  production: false,
  apiBaseUrl: 'https://ar-sa.com.mx',
  // Backend de la familia Nexus (workspace): paquetes, preferences y estado de orden.
  // En desarrollo queda vacío para que `ng serve` proxye /api hacia
  // https://nube.ar-sa.com.mx:8444 mediante proxy.conf.json.
  workspaceApiBaseUrl: '',
  // Productos FÁCIL en validación (tribufi, cardsstudio, cobrafacil, scriptura).
  // Ocultos tanto en desarrollo como en producción hasta validarlos.
  // Para validarlos localmente, cambie esta línea a true (igual comportamiento
  // que environment.prod.ts para el deploy).
  mostrarProductosPendientes: false,
};
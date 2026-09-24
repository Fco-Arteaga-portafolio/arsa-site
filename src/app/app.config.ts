import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular v21+ es zoneless por defecto. El código de este proyecto está
    // escrito con el modelo clásico (cambia campos planos tras async, sin
    // signals ni markForCheck), así que se restaura explicitamente el change
    // detection por zona (zone.js ya está en los polyfills).
    provideZoneChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
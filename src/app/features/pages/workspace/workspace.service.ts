import { Injectable } from '@angular/core';

export interface Paquete {
  id: number;
  nombre: string;
  gigaBytes: number;
  precio: number;
}

export interface PreferenciaRequest {
  nombreUsuarioDeseado: string;
  email: string;
  paqueteId: number;
}

export interface PreferenciaResponse {
  ordenId: string;
  checkoutUrl: string;
}

export interface EstadoOrden {
  estado: 'Pendiente' | 'Aprobada' | 'Cancelada';
  usuario: string | null;
  password: string | null;
}

export interface CrearPreferenciaResult {
  exito: boolean;
  status: number;
  ordenId?: string;
  checkoutUrl?: string;
  error?: string;
}

/**
 * Servicio de la familia Workspace.
 * Usa rutas relativas (/api/...). En desarrollo, `ng serve` las proxya hacia
 * https://nube.ar-sa.com.mx:8444 mediante proxy.conf.json (evita CORS en local).
 * En producción el `/api` debe quedar expuesto por el servidor/reverse proxy del sitio.
 */
@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  /** GET /api/paquetes — lista los planes disponibles. */
  async getPaquetes(): Promise<Paquete[]> {
    const response = await fetch('/api/paquetes');
    if (!response.ok) {
      throw new Error('Error al cargar los planes disponibles.');
    }
    return response.json();
  }

  /**
   * POST /api/preferences — crea la orden de pago.
   * Devuelve el status HTTP y el cuerpo parseado para que la página maneje
   * 200 / 400 / 409 / 502 según el contrato.
   */
  async crearPreferencia(solicitud: PreferenciaRequest): Promise<CrearPreferenciaResult> {
    let response: Response;
    try {
      response = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solicitud),
      });
    } catch {
      throw new Error('No se pudo conectar con el servidor de pagos. Verifica tu conexión e intenta de nuevo.');
    }

    const body = await response.json().catch(() => null);

    if (response.ok && body && typeof body.ordenId === 'string' && typeof body.checkoutUrl === 'string') {
      return {
        exito: true,
        status: 200,
        ordenId: body.ordenId,
        checkoutUrl: body.checkoutUrl,
      };
    }

    return {
      exito: false,
      status: response.status,
      error: body?.error ?? 'No se pudo crear la orden de pago.',
    };
  }

  /** GET /api/preferences/{ordenId}/estado — consulta el estado de la orden. */
  async getEstadoOrden(ordenId: string): Promise<EstadoOrden> {
    const response = await fetch(
      `/api/preferences/${encodeURIComponent(ordenId)}/estado`,
    );
    if (!response.ok) {
      throw new Error('Error al consultar el estado de la orden.');
    }
    return response.json();
  }
}
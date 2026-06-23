import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { MenuResponse } from '../models/menu.interface';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = environment.apiBaseUrl;

  async getByBranch(idSucursal: string): Promise<MenuResponse> {
    const response = await fetch(
      `${this.baseUrl}/api-delivery/menu/public/branch/${idSucursal}`,
    );
    if (!response.ok) throw new Error('Error al cargar el menú');
    return response.json();
  }
}

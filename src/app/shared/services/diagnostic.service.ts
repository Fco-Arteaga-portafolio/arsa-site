import { Injectable, signal, isDevMode } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface DiagnosticData {
  name: string;
  company: string;
  email: string;
  service: string;
  problem: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiagnosticService {
  isModalOpen = signal(false);

  private get apiUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3001';
    }
    return environment.apiBaseUrl;
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  async sendDiagnostic(data: DiagnosticData): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.apiUrl}/api/send-diagnostic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Error de conexión' }));
      throw new Error(err.error || 'Error al enviar el diagnóstico');
    }

    return response.json();
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticService {
  isModalOpen = signal(false);

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}

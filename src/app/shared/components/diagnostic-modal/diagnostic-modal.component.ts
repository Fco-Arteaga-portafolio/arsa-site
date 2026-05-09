import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diagnostic-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diagnostic-modal.component.html',
})
export class DiagnosticModalComponent {
  // Control de apertura
  @Input({ required: true })
  isOpen = false;

  // Evento de cierre
  @Output()
  close = new EventEmitter<void>();

  // Evento submit
  @Output()
  submitForm = new EventEmitter<any>();

  // Estado local del formulario
  loading = signal(false);

  // Formulario
  diagnosticForm = {
    name: '',
    company: '',
    email: '',
    service: '',
    problem: '',
  };

  // Cerrar modal
  closeModal(): void {
    this.close.emit();
  }

  // Submit
  async submitDiagnostic(): Promise<void> {
    // Validación mínima
    if (!this.diagnosticForm.name || !this.diagnosticForm.email || !this.diagnosticForm.problem) {
      return;
    }

    try {
      this.loading.set(true);

      // Emitimos hacia el padre
      this.submitForm.emit(this.diagnosticForm);

      // Simulación async
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Reset
      this.diagnosticForm = {
        name: '',
        company: '',
        email: '',
        service: '',
        problem: '',
      };

      // Cerramos
      this.closeModal();
    } finally {
      this.loading.set(false);
    }
  }
}

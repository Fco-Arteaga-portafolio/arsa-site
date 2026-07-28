import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiagnosticService } from '../../services/diagnostic.service';

@Component({
  selector: 'app-diagnostic-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diagnostic-modal.component.html',
})
export class DiagnosticModalComponent {
  @Input({ required: true })
  isOpen = false;

  @Output()
  close = new EventEmitter<void>();

  loading = signal(false);
  sent = signal(false);
  errorMsg = signal('');

  diagnosticForm = {
    name: '',
    company: '',
    email: '',
    service: '',
    problem: '',
  };

  constructor(private diagnosticService: DiagnosticService) {}

  closeModal(): void {
    this.close.emit();
  }

  async submitDiagnostic(): Promise<void> {
    if (!this.diagnosticForm.name || !this.diagnosticForm.email || !this.diagnosticForm.problem) {
      return;
    }

    try {
      this.loading.set(true);
      this.errorMsg.set('');

      await this.diagnosticService.sendDiagnostic(this.diagnosticForm);

      this.sent.set(true);
      this.diagnosticForm = { name: '', company: '', email: '', service: '', problem: '' };
    } catch (err: any) {
      this.errorMsg.set(err.message || 'Error al enviar. Intenta de nuevo.');
    } finally {
      this.loading.set(false);
    }
  }

  resetAndClose(): void {
    this.sent.set(false);
    this.errorMsg.set('');
    this.closeModal();
  }
}

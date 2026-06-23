import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eliminar-cuenta.html',
  styleUrl: './eliminar-cuenta.css',
})
export class EliminarCuentaComponent {
  showForm = false;
  formSubmitted = false;
  formData = {
    email: '',
    accountEmail: '',
    reason: '',
    confirmDelete: false,
  };

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitDeletionRequest() {
    if (this.isFormValid()) {
      // Aquí iría la lógica para enviar el formulario al servidor
      console.log('Solicitud de eliminación:', this.formData);
      this.formSubmitted = true;

      // Reset del formulario después de 5 segundos
      setTimeout(() => {
        this.formSubmitted = false;
        this.formData = {
          email: '',
          accountEmail: '',
          reason: '',
          confirmDelete: false,
        };
        this.showForm = false;
      }, 5000);
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.email.trim() !== '' &&
      this.formData.accountEmail.trim() !== '' &&
      this.formData.reason.trim() !== '' &&
      this.formData.confirmDelete === true
    );
  }
}

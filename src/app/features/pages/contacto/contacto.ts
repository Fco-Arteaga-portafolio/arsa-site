import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DiagnosticService } from '../../../shared/services/diagnostic.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class ContactoComponent {
  constructor(
    private location: Location,
    public diagnosticService: DiagnosticService
  ) {}

  openDiagnosticModal(): void {
    this.diagnosticService.openModal();
  }

  goBack(): void {
    this.location.back();
  }
}

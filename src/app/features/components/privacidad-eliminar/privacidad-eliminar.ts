import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticService } from '../../../shared/services/diagnostic.service';

@Component({
  selector: 'app-privacidad-eliminar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacidad-eliminar.html',
  styleUrl: './privacidad-eliminar.css',
})
export class PrivacidadEliminarComponent {
  @Input() appName = '';
  @Input() activeSection: 'inicio' | 'paquetes' | 'privacidad' | 'eliminar' = 'privacidad';

  constructor(public diagnosticService: DiagnosticService) {}
}
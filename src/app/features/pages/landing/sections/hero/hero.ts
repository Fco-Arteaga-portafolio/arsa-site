import { Component, ViewEncapsulation } from '@angular/core';
import { DiagnosticService } from '../../../../../shared/services/diagnostic.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  constructor(public diagnosticService: DiagnosticService) {}
}

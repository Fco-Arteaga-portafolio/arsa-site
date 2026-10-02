import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiagnosticService } from '../../../../../shared/services/diagnostic.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  constructor(public diagnosticService: DiagnosticService) {}
}

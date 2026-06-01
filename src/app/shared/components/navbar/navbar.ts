import { Component } from '@angular/core';
import { DiagnosticService } from '../../services/diagnostic.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public diagnosticService: DiagnosticService) {}
}

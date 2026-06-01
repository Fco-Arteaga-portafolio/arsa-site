import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { DiagnosticModalComponent } from './shared/components/diagnostic-modal/diagnostic-modal.component';
import { DiagnosticService } from './shared/services/diagnostic.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, DiagnosticModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'arsa-landing';

  constructor(public diagnosticService: DiagnosticService) {}

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-back',
    });
  }

  closeDiagnosticModal(): void {
    this.diagnosticService.closeModal();
  }

  handleDiagnosticSubmit(data: any): void {
    console.log(data);

    // Aquí luego:
    // API
    // email
    // CRM
    // etc
  }
}

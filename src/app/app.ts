import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Hero } from './features/landing/sections/hero/hero';
import { IfratPreview } from './features/landing/sections/ifrat-preview/ifrat-preview';
import { Footer } from './shared/components/footer/footer'; // <--- 1. Importa el archivo
import { Services } from './features/landing/sections/services/services';
import { Contact } from './features/landing/sections/contact/contact';
import { DiagnosticModalComponent } from './shared/components/diagnostic-modal/diagnostic-modal.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar,
    Hero,
    IfratPreview,
    Footer,
    Services,
    Contact,
    DiagnosticModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'arsa-landing';
  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-back',
    });
  }

  showDiagnosticModal = false;

  openDiagnosticModal(): void {
    this.showDiagnosticModal = true;
  }

  closeDiagnosticModal(): void {
    this.showDiagnosticModal = false;
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

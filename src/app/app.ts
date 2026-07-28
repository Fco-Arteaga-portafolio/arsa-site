import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  isMenusRoute = signal(false);
  title = 'arsa-landing';

  constructor(
    public diagnosticService: DiagnosticService,
    private router: Router,
  ) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => this.isMenusRoute.set(event.url.startsWith('/menus')));
  }

  ngOnInit() {
    this.isMenusRoute.set(this.router.url.startsWith('/menus'));
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-back',
    });
  }

  closeDiagnosticModal(): void {
    this.diagnosticService.closeModal();
  }

  
}

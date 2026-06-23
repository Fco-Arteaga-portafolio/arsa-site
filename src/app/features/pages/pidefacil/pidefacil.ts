import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DiagnosticService } from '../../../shared/services/diagnostic.service';

// 1. Agrega los nuevos imports de FontAwesome aquí arriba:
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGooglePlay, faApple } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-pidefacil',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule], // 2. Agrega FontAwesomeModule en tus imports del componente
  templateUrl: './pidefacil.html',
  styleUrl: './pidefacil.css',
})
export class PidefacilComponent implements OnInit, OnDestroy {
  // 3. Declara las variables de los iconos para que tu HTML las pueda mapear:
  iconGooglePlay = faGooglePlay;
  iconApple = faApple;

  activeSection: 'inicio' | 'privacidad' | 'eliminar' = 'inicio';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public diagnosticService: DiagnosticService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const section = params.get('section') as 'inicio' | 'privacidad' | 'eliminar' | null;
      console.log('Sección actualizada a:', section || 'inicio');
      this.activeSection = section || 'inicio';
      this.cdr.markForCheck();
      window.scrollTo(0, 0);
    });

    this.detectPideFacilPlatform();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(section: 'inicio' | 'privacidad' | 'eliminar'): void {
    console.log('Navegando a:', section);
    this.router.navigate(['/pidefacil', section]);
  }

  private detectPideFacilPlatform(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const userAgent = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
  }
}

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DiagnosticService } from '../../../shared/services/diagnostic.service';

@Component({
  selector: 'app-subet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subet.html',
  styleUrl: './subet.css',
})
export class SubetComponent implements OnInit, OnDestroy {
  activeSection: 'inicio' | 'privacidad' | 'eliminar' = 'inicio';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public diagnosticService: DiagnosticService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const section = params.get('section') as 'inicio' | 'privacidad' | 'eliminar' | null;
      console.log('Sección actualizada a:', section || 'inicio');
      this.activeSection = section || 'inicio';
      this.cdr.markForCheck();
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(section: 'inicio' | 'privacidad' | 'eliminar'): void {
    console.log('Navegando a:', section);
    this.router.navigate(['/subet', section]);
  }
}

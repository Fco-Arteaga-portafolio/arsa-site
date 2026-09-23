import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Paquete, WorkspaceService } from './workspace.service';
import { PrivacidadEliminarComponent } from '../../../components/privacidad-eliminar/privacidad-eliminar';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, PrivacidadEliminarComponent],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  activeSection: 'inicio' | 'paquetes' | 'privacidad' | 'eliminar' = 'inicio';
  private destroy$ = new Subject<void>();

  paquetes: Paquete[] = [];
  cargando = true;
  error = '';

  constructor(
    private service: WorkspaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const section = params.get('section') as 'inicio' | 'paquetes' | 'privacidad' | 'eliminar' | null;
      this.activeSection = section || 'inicio';
      window.scrollTo(0, 0);
    });
    this.cargarPaquetes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(section: 'inicio' | 'paquetes' | 'privacidad' | 'eliminar'): void {
    this.router.navigate(['/workspace', section]);
  }

  async cargarPaquetes(): Promise<void> {
    this.cargando = true;
    this.error = '';
    try {
      this.paquetes = await this.service.getPaquetes();
    } catch (err) {
      this.error =
        err instanceof Error ? err.message : 'No pudimos cargar los planes disponibles. Intenta de nuevo.';
    } finally {
      this.cargando = false;
    }
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(precio);
  }

  contratar(paqueteId: number): void {
    this.router.navigate(['/workspace/checkout'], { queryParams: { paqueteId } });
  }
}
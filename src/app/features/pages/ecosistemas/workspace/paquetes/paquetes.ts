import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paquete, WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspace-paquetes',
  standalone: true,
  imports: [],
  templateUrl: './paquetes.html',
  styleUrl: './paquetes.css',
})
export class WorkspacePaquetesComponent implements OnInit {
  paquetes: Paquete[] = [];
  cargando = true;
  error = '';

  constructor(
    private service: WorkspaceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarPaquetes();
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
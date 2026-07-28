import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Producto {
  titulo: string;
  icono: string;
  descripcion: string;
  caracteristicas: string[];
  url: string;
  botonTexto: string;
  colorPrimario: 'arsa-primary' | 'arsa-accent';
  colorSecundario: 'arsa-accent' | 'blue-500';
}

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
  private router = inject(Router);

  get borderColorClass(): string {
    return this.producto.colorPrimario === 'arsa-accent'
      ? 'hover:border-arsa-accent'
      : 'hover:border-arsa-primary';
  }

  get gradientOverlayClass(): string {
    return this.producto.colorPrimario === 'arsa-accent'
      ? 'from-arsa-accent/5'
      : 'from-arsa-primary/5';
  }

  get isAccentColor(): boolean {
    return this.producto.colorPrimario === 'arsa-accent';
  }

  get featureIconColor(): string {
    return this.producto.colorPrimario === 'arsa-accent'
      ? 'text-arsa-accent'
      : 'text-arsa-primary';
  }

  irA(): void {
    if (this.producto.url && this.producto.url !== '#') {
      this.router.navigateByUrl(this.producto.url);
    }
  }
}


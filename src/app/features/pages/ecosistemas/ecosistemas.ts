import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ProductoCardComponent, Producto } from '../../components/producto-card';

@Component({
  selector: 'app-ecosistemas',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './ecosistemas.html',
  styleUrl: './ecosistemas.css',
})
export class EcosistemasComponent implements OnInit {
  productos: Producto[] = [
    {
      titulo: 'IFRAT Desktop',
      icono: '💻',
      descripcion:
        'Solución de escritorio para gestión fiscal y operativa. Diseñada para empresas que requieren control total en sus procesos críticos.',
      caracteristicas: [
        'Gestión fiscal completa',
        'Automatización de procesos',
        'Reportes avanzados',
        'Soporte empresarial 24/7',
      ],
      url: '/ifrat',
      botonTexto: 'Conocer más',
      colorPrimario: 'arsa-primary',
      colorSecundario: 'arsa-accent',
    },
    {
      titulo: 'IFRAT Emite',
      icono: '📄',
      descripcion:
        'Solución especializada en emisión y gestión de comprobantes fiscales. Integración directa con el SAT para máxima eficiencia.',
      caracteristicas: [
        'Emisión de CFDI automática',
        'Integración SAT nativa',
        'Timbrado masivo',
        'Validación en tiempo real',
      ],
      url: '/ifrat-emite',
      botonTexto: 'Conocer más',
      colorPrimario: 'arsa-accent',
      colorSecundario: 'blue-500',
    },
    {
      titulo: 'Pide Facil',
      icono: '🛒',
      descripcion:
        'Plataforma de pedidos y entregas para restaurantes y comercios. Gestiona pedidos, entregas y clientela en una sola solución.',
      caracteristicas: [
        'Gestión de pedidos',
        'Entregas integradas',
        'Reportes analytics',
        'Calificaciones de clientes',
      ],
      url: '/pidefacil',
      botonTexto: 'Conocer más',
      colorPrimario: 'arsa-primary',
      colorSecundario: 'arsa-accent',
    },
    {
      titulo: 'Sube T',
      icono: '🛵',
      descripcion:
        'Plataforma de movilidad compartida y gestión de viajes. Conecta pasajeros, gestiona flotas independientes, optimiza rutas y reserva asientos bajo demanda.',
      caracteristicas: [
        'Viajes bajo demanda y programados',
        'Configuración visual de asientos',
        'Administración y asignación de flotas',
        'Tracking y seguridad en tiempo real',
      ],
      url: '/subet',
      botonTexto: 'Conocer más',
      colorPrimario: 'arsa-accent',
      colorSecundario: 'blue-500',
    },
  ];

  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}

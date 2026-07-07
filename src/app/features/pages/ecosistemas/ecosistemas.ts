import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoCardComponent, Producto } from '../../components/producto-card';

interface Familia {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  color: string;
  bgGradient: string;
  badgeColor: string;
  productos: number;
  tags: string[];
}

@Component({
  selector: 'app-ecosistemas',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './ecosistemas.html',
  styleUrl: './ecosistemas.css',
})
export class EcosistemasComponent implements OnInit {
  familiaSeleccionada: string | null = null;

  familias: Familia[] = [
    {
      id: 'ifrat',
      nombre: 'IFRAT',
      icono: '💻',
      descripcion:
        'Ecosistema de soluciones fiscales y de operación crítica para empresas. Automatización, control total y cumplimiento SAT.',
      color: 'blue',
      bgGradient: 'from-blue-600 to-indigo-700',
      badgeColor: 'bg-blue-100 text-blue-800',
      productos: 4,
      tags: ['Fiscal', 'Desktop', 'SAT', 'Empresarial'],
    },
    {
      id: 'facil',
      nombre: 'FÁCIL',
      icono: '🚀',
      descripcion:
        'Plataformas digitales simples y accesibles para la vida diaria: pedidos, movilidad y más. Tecnología al servicio de todos.',
      color: 'green',
      bgGradient: 'from-green-600 to-teal-600',
      badgeColor: 'bg-green-100 text-green-800',
      productos: 3,
      tags: ['Delivery', 'Movilidad', 'Multi-plataforma'],
    },
  ];

  productosIFRAT: Producto[] = [
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
      titulo: 'IFRAT Folios',
      icono: '📋',
      descripcion:
        'Gestión y control de folios fiscales. Administración centralizada de numeración, asignación y seguimiento de folios para documentos fiscales.',
      caracteristicas: [
        'Control de folios por RFC',
        'Asignación automática',
        'Historial y trazabilidad',
        'Integración con IFRAT Desktop',
      ],
      url: '/ifrat-folios',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-primary',
      colorSecundario: 'arsa-accent',
    },
    {
      titulo: 'IFRAT Pagos',
      icono: '💳',
      descripcion:
        'Plataforma de pagos y cobranza empresarial. Centraliza pagos, complementos de pago y conciliación bancaria en un solo lugar.',
      caracteristicas: [
        'Complementos de pago automáticos',
        'Conciliación bancaria',
        'Múltiples formas de pago',
        'Reportes financieros',
      ],
      url: '/ifrat-pagos',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-accent',
      colorSecundario: 'blue-500',
    },
  ];

  productosFacil: Producto[] = [
    {
      titulo: 'Pide Fácil',
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
    {
      titulo: 'Súper Fácil',
      icono: '⭐',
      descripcion:
        'La plataforma todo-en-uno que simplifica tu día a día. Productos, servicios y más en un solo lugar, diseñado para ser verdaderamente fácil.',
      caracteristicas: [
        'Gestión integral',
        'Interfaz sencilla',
        'Multi-dispositivo',
        'Soporte dedicado',
      ],
      url: '/super-facil',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-primary',
      colorSecundario: 'arsa-accent',
    },
  ];

  get productosActuales(): Producto[] {
    if (this.familiaSeleccionada === 'ifrat') return this.productosIFRAT;
    if (this.familiaSeleccionada === 'facil') return this.productosFacil;
    return [];
  }

  get familiaActual(): Familia | undefined {
    return this.familias.find((f) => f.id === this.familiaSeleccionada);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.familiaSeleccionada = params.get('familia');
    });
  }

  irAFamilia(familiaId: string): void {
    this.router.navigate(['/ecosistemas', familiaId]);
  }

  volverAFamilias(): void {
    this.router.navigate(['/ecosistemas']);
  }
}

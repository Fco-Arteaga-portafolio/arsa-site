import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoCardComponent, Producto } from '../../components/producto-card';
import { environment } from '../../../../environments/environment';

// Productos FÁCIL en validación (scaffolding): NO deben verse en producción.
// Se ocultan con environment.mostrarProductosPendientes (ver src/environments/);
// en local se muestran para validación.
const PRODUCTOS_FACIL_PENDIENTES: string[] = [
  '/tribufi',
  '/cardsstudio',
  '/cobrafacil',
  '/scriptura',
];

interface Familia {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  color: string;
  bgGradient: string;
  badgeColor: string;
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
      tags: ['Fiscal', 'Desktop', 'SAT', 'Empresarial'],
    },
    {
      id: 'facil',
      nombre: 'FÁCIL',
      icono: '🚀',
      descripcion:
        'Apps nativas que simplifican tu día a día: pide comida, viaja y controla tu presupuesto del hogar con herramientas offline-first, privadas y verdaderamente fáciles.',
      color: 'green',
      bgGradient: 'from-green-600 to-teal-600',
      badgeColor: 'bg-green-100 text-green-800',
      tags: ['Delivery', 'Movilidad', 'Presupuesto', 'Running'],
    },
    {
      id: 'workspace',
      nombre: 'Workspace',
      icono: '☁️',
      descripcion:
        'Servicios en la nube y suscripciones de software como servicio. Tu espacio personal de trabajo con almacenamiento, acceso desde cualquier dispositivo y soporte incluido.',
      color: 'violet',
      bgGradient: 'from-purple-600 to-violet-700',
      badgeColor: 'bg-purple-100 text-purple-800',
      tags: ['Cloud', 'SaaS', 'Suscripción', 'Almacenamiento'],
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
      titulo: 'subeFacil',
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
      icono: '🛒',
      descripcion:
        'Control presupuestal y memoria económica del hogar 100% offline. Planifica tus compras con un grid de canasta básica, registra precios con escáner de barras y recibe alertas cuando tu costo de vida cambia.',
      caracteristicas: [
        'Grid de canasta básica mexicana',
        'Presupuesto predictivo por historial',
        'Escáner de código de barras offline',
        'Alertas de incremento en tu canasta',
      ],
      url: '/super-facil',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-primary',
      colorSecundario: 'arsa-accent',
    },
    {
      titulo: 'runExp',
      icono: '🏃',
      descripcion:
        'Aplicación para la comunidad runner. Seguimiento de actividad, rutas, ritmo y conexión con otros corredores.',
      caracteristicas: [
        'Seguimiento de actividad',
        'Registro de rutas y ritmo',
        'Comunidad runner',
        'Estadísticas de rendimiento',
      ],
      url: '/run-run-run',
      botonTexto: 'Conocer más',
      colorPrimario: 'arsa-accent',
      colorSecundario: 'blue-500',
    },
    // TODO: los siguientes 4 productos son scaffolding — icono, descripción y
    // características son placeholders por definir producto por producto.
    {
      titulo: 'tribufi',
      icono: '🆕',
      descripcion: 'Descripción pendiente de definirse.',
      caracteristicas: ['Detalle pendiente de definirse'],
      url: '/tribufi',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-primary',
      colorSecundario: 'arsa-accent',
    },
    {
      titulo: 'cardsStudio',
      icono: '✨',
      descripcion: 'Descripción pendiente de definirse.',
      caracteristicas: ['Detalle pendiente de definirse'],
      url: '/cardsstudio',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-accent',
      colorSecundario: 'blue-500',
    },
    {
      titulo: 'cobraFacil',
      icono: '🧩',
      descripcion: 'Descripción pendiente de definirse.',
      caracteristicas: ['Detalle pendiente de definirse'],
      url: '/cobrafacil',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-primary',
      colorSecundario: 'arsa-accent',
    },
    {
      titulo: 'scriptura',
      icono: '📱',
      descripcion: 'Descripción pendiente de definirse.',
      caracteristicas: ['Detalle pendiente de definirse'],
      url: '/scriptura',
      botonTexto: 'Próximamente',
      colorPrimario: 'arsa-accent',
      colorSecundario: 'blue-500',
    },
  ];

  get productosFacilVisibles(): Producto[] {
    if (environment.mostrarProductosPendientes) return this.productosFacil;
    return this.productosFacil.filter((p) => !PRODUCTOS_FACIL_PENDIENTES.includes(p.url));
  }

  get productosActuales(): Producto[] {
    if (this.familiaSeleccionada === 'ifrat') return this.productosIFRAT;
    if (this.familiaSeleccionada === 'facil') return this.productosFacilVisibles;
    return [];
  }

  productosFamilia(familiaId: string): number {
    if (familiaId === 'ifrat') return this.productosIFRAT.length;
    if (familiaId === 'facil') return this.productosFacilVisibles.length;
    return 0;
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
      // Workspace ya no es una familia con vista intermedia: la tarjeta va directo
      // a la página del producto (/workspace). Redirigimos la URL vieja.
      if (params.get('familia') === 'workspace') {
        this.router.navigate(['/workspace'], { replaceUrl: true });
        return;
      }
      this.familiaSeleccionada = params.get('familia');
    });
  }

  irAFamilia(familiaId: string): void {
    this.router.navigate(['/ecosistemas', familiaId]);
  }

  /** Clic en tarjeta de familia: workspace va directo a su página de producto. */
  clicEnFamilia(familia: Familia): void {
    if (familia.id === 'workspace') {
      this.router.navigate(['/workspace']);
      return;
    }
    this.irAFamilia(familia.id);
  }

  ctaClases(familia: Familia): string {
    if (familia.color === 'blue') return 'text-blue-600 group-hover:text-blue-700';
    if (familia.color === 'green') return 'text-green-600 group-hover:text-green-700';
    return 'text-purple-600 group-hover:text-purple-700';
  }

  volverAFamilias(): void {
    this.router.navigate(['/ecosistemas']);
  }
}

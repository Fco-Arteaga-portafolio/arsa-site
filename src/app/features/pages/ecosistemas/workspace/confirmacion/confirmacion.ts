import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkspaceService } from '../workspace.service';

type EstadoVista = 'Pendiente' | 'Aprobada' | 'Cancelada' | 'agotado' | 'sinOrden';

@Component({
  selector: 'app-workspace-confirmacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css',
})
export class WorkspaceConfirmacionComponent implements OnInit, OnDestroy {
  private readonly INTERVALO_MS = 3000;
  private readonly MAX_INTENTOS = 100;

  ordenId = '';
  estado: EstadoVista = 'Pendiente';
  usuario = '';
  password = '';
  usuarioCopiado = false;
  passwordCopiada = false;
  hayErrorConsulta = false;

  private intentos = 0;
  private temporizador: ReturnType<typeof setInterval> | null = null;

  constructor(
    private service: WorkspaceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Prioridad: el checkout guarda workspace_ordenId antes de enviar a Mercado
    // Pago. Como fallback (pestaña nueva, modo privado o link directo), leemos
    // el ordenId del query param que manda el successUrl.
    this.ordenId = localStorage.getItem('workspace_ordenId') ?? '';
    if (!this.ordenId) {
      this.ordenId = this.route.snapshot.queryParamMap.get('ordenId') ?? '';
    }
    if (!this.ordenId) {
      this.estado = 'sinOrden';
      return;
    }
    this.iniciarPolling();
  }

  ngOnDestroy(): void {
    this.detenerPolling();
  }

  /**
   * Polling cada 3 segundos al endpoint de estado.
   * Se detiene cuando el estado deja de ser "Pendiente" o tras ~100 intentos (5 min).
   */
  private iniciarPolling(): void {
    void this.consultarEstado();
    this.temporizador = setInterval(() => void this.consultarEstado(), this.INTERVALO_MS);
  }

  private detenerPolling(): void {
    if (this.temporizador !== null) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }

  private async consultarEstado(): Promise<void> {
    if (this.estado === 'Aprobada' || this.estado === 'Cancelada' || this.estado === 'agotado') {
      return;
    }

    this.intentos += 1;

    try {
      const estadoOrden = await this.service.getEstadoOrden(this.ordenId);

      if (estadoOrden.estado === 'Aprobada') {
        this.estado = 'Aprobada';
        // La password solo llega la primera vez que se consulta; se guarda en memoria.
        if (estadoOrden.usuario) this.usuario = estadoOrden.usuario;
        if (estadoOrden.password) this.password = estadoOrden.password;
        this.detenerPolling();
        return;
      }

      if (estadoOrden.estado === 'Cancelada') {
        this.estado = 'Cancelada';
        this.detenerPolling();
        return;
      }

      // "Pendiente" → seguimos consultando mientras no se agote el tiempo.
      if (this.intentos >= this.MAX_INTENTOS) {
        this.estado = 'agotado';
        this.detenerPolling();
      }
    } catch {
      // Falla transitoria (ej. 502 / red): intentamos de nuevo hasta agotar intentos.
      this.hayErrorConsulta = true;
      if (this.intentos >= this.MAX_INTENTOS) {
        this.estado = 'agotado';
        this.detenerPolling();
      }
    }
  }

  reiniciarPago(): void {
    const paqueteId = this.paqueteIdGuardado();
    this.router.navigate(['/workspace/checkout'], {
      queryParams: paqueteId !== null ? { paqueteId } : undefined,
    });
  }

  private paqueteIdGuardado(): number | null {
    const id = Number(localStorage.getItem('workspace_paqueteId'));
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  async copiarAlPortapapeles(texto: string, tipo: 'usuario' | 'password'): Promise<void> {
    if (!texto) return;
    try {
      await navigator.clipboard.writeText(texto);
      if (tipo === 'usuario') {
        this.usuarioCopiado = true;
      } else {
        this.passwordCopiada = true;
      }
    } catch {
      // Portapapeles no disponible (contexto no seguro); lo ignoramos.
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Paquete, WorkspaceService } from '../workspace.service';

const USERNAME_REGEX = /^[a-z0-9_.-]{3,64}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-workspace-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class WorkspaceCheckoutComponent implements OnInit {
  paquetes: Paquete[] = [];
  cargandoPaquetes = true;
  paqueteId: number | null = null;
  paqueteSeleccionado: Paquete | null = null;
  sinPaquete = false;

  nombreUsuarioDeseado = '';
  email = '';

  enviando = false;
  errorMensaje = '';
  errorAyuda = '';
  mensajeUsuario = '';
  mensajeEmail = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: WorkspaceService,
  ) {}

  ngOnInit(): void {
    this.restaurarCamposPrevios();

    // El paqueteId llega por query param desde la página de producto.
    const queryId = Number(this.route.snapshot.queryParamMap.get('paqueteId'));
    if (Number.isInteger(queryId) && queryId > 0) {
      this.paqueteId = queryId;
    } else if (this.paqueteId === null) {
      this.sinPaquete = true;
    }

    this.cargarPaquetes();
  }

  private restaurarCamposPrevios(): void {
    // Permite rellenar el formulario si el usuario regresa tras un pago cancelado.
    if (this.paqueteId === null) {
      const guardado = localStorage.getItem('workspace_paqueteId');
      if (guardado) {
        const id = Number(guardado);
        if (Number.isInteger(id) && id > 0) {
          this.paqueteId = id;
        }
      }
    }
    this.nombreUsuarioDeseado = localStorage.getItem('workspace_username') ?? '';
    this.email = localStorage.getItem('workspace_email') ?? '';
  }

  private async cargarPaquetes(): Promise<void> {
    this.cargandoPaquetes = true;
    try {
      this.paquetes = await this.service.getPaquetes();
      this.paqueteSeleccionado = this.paquetes.find((p) => p.id === this.paqueteId) ?? null;
      if (this.paqueteId !== null && !this.paqueteSeleccionado) {
        this.sinPaquete = true;
      }
    } catch {
      this.sinPaquete = true;
    } finally {
      this.cargandoPaquetes = false;
    }
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(precio);
  }

  validarUsuario(): boolean {
    if (!USERNAME_REGEX.test(this.nombreUsuarioDeseado.trim())) {
      this.mensajeUsuario =
        'El nombre de usuario solo puede contener minúsculas, números y los caracteres . _ - (entre 3 y 64 caracteres).';
      return false;
    }
    this.mensajeUsuario = '';
    return true;
  }

  validarEmail(): boolean {
    if (!EMAIL_REGEX.test(this.email.trim())) {
      this.mensajeEmail = 'Ingresa un correo electrónico válido.';
      return false;
    }
    this.mensajeEmail = '';
    return true;
  }

  private validarFormulario(): boolean {
    let valido = true;
    if (!this.validarUsuario()) valido = false;
    if (!this.validarEmail()) valido = false;

    if (!this.paqueteSeleccionado) {
      this.errorMensaje = 'Selecciona un paquete válido para continuar.';
      valido = false;
    }

    return valido;
  }

  async enviar(): Promise<void> {
    if (this.enviando) return;

    this.errorMensaje = '';
    this.errorAyuda = '';
    this.mensajeUsuario = '';
    this.mensajeEmail = '';

    if (!this.validarFormulario() || !this.paqueteSeleccionado) return;

    this.enviando = true;
    try {
      const resultado = await this.service.crearPreferencia({
        nombreUsuarioDeseado: this.nombreUsuarioDeseado.trim(),
        email: this.email.trim(),
        paqueteId: this.paqueteSeleccionado.id,
      });

      if (resultado.exito && resultado.ordenId && resultado.checkoutUrl) {
        // Guardamos el ordenId y contexto para la página de confirmación y el reintento.
        localStorage.setItem('workspace_ordenId', resultado.ordenId);
        localStorage.setItem('workspace_paqueteId', String(this.paqueteSeleccionado.id));
        localStorage.setItem('workspace_username', this.nombreUsuarioDeseado.trim());
        localStorage.setItem('workspace_email', this.email.trim());

        // Redirección completa a Mercado Pago (no iframe ni popup).
        window.location.href = resultado.checkoutUrl;
        return;
      }

      // Respuestas de error del contrato (400 / 409 / 502 / otro).
      this.errorMensaje = resultado.error ?? 'No se pudo crear la orden de pago.';
      switch (resultado.status) {
        case 409:
          this.errorAyuda = 'Ese nombre de usuario ya está en uso. Prueba con otro.';
          break;
        case 502:
          this.errorAyuda = 'El servicio está teniendo una falla temporal. Intenta de nuevo en unos momentos.';
          break;
        case 400:
          this.errorAyuda = 'Revisa el formato del nombre de usuario o elige otro paquete.';
          break;
      }
    } catch (err) {
      this.errorMensaje =
        err instanceof Error ? err.message : 'Ocurrió un error inesperado. Intenta de nuevo.';
      this.errorAyuda = 'El pago no se procesó. Intenta de nuevo en unos momentos.';
    } finally {
      this.enviando = false;
    }
  }
}
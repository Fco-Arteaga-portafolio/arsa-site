import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DiagnosticService } from '../../../shared/services/diagnostic.service';

interface Release {
  tag_name: string;
  assets: Asset[];
}

interface Asset {
  name: string;
  browser_download_url: string;
}

interface Download {
  platform: string;
  format: string;
  url: string | null;
  isLoading: boolean;
  isAvailable: boolean;
}

@Component({
  selector: 'app-ifrat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ifrat.html',
  styleUrl: './ifrat.css',
})
export class IfratComponent implements OnInit, OnDestroy {
  activeSection:
    | 'inicio'
    | 'funcionalidades'
    | 'precios'
    | 'preguntas'
    | 'requisitos'
    | 'privacidad'
    | 'eliminar'
    | 'descarga' = 'inicio';
  private destroy$ = new Subject<void>();

  // Calculadora
  subtotal = '$0.00';
  savings = '-$0.00';
  total = '$0.00';
  rfcCount = 1;
  machineCount = 1;
  savingsPercent = '0%';

  // Descargas
  versionTag = 'Obteniendo última versión...';
  downloads: Download[] = [
    { platform: 'Windows', format: '.exe', url: null, isLoading: true, isAvailable: false },
    { platform: 'macOS', format: '.dmg / .zip', url: null, isLoading: true, isAvailable: false },
    {
      platform: 'Linux',
      format: 'Ubuntu (.deb / .AppImage)',
      url: null,
      isLoading: true,
      isAvailable: false,
    },
  ];
  private readonly REPO = 'Fco-Arteaga-portafolio/ifrat-releases';
  private readonly API_URL = `https://api.github.com/repos/${this.REPO}/releases/latest`;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public diagnosticService: DiagnosticService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const section = params.get('section') as typeof this.activeSection | null;
      this.activeSection = section || 'inicio';
      this.cdr.markForCheck();
      window.scrollTo(0, 0);

      if (this.activeSection === 'precios') {
        this.initializePriceCalculator();
      }
      if (this.activeSection === 'descarga') {
        this.fetchReleases();
      }
    });

    this.initializePriceCalculator();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(section: typeof this.activeSection): void {
    this.router.navigate(['/ifrat', section]);
  }

  fetchReleases(): void {
    // Reset estado
    this.versionTag = 'Obteniendo última versión...';
    this.downloads.forEach((d) => {
      d.isLoading = true;
      d.isAvailable = false;
      d.url = null;
    });

    fetch(this.API_URL)
      .then((r) => r.json())
      .then((data: Release) => {
        this.versionTag = `Última versión estable: ${data.tag_name}`;
        this.downloads[0].url =
          data.assets.find((a) => a.name.endsWith('.exe'))?.browser_download_url || null;
        this.downloads[1].url =
          data.assets.find((a) => a.name.endsWith('.dmg') || a.name.endsWith('.zip'))
            ?.browser_download_url || null;
        this.downloads[2].url =
          data.assets.find((a) => a.name.endsWith('.deb') || a.name.endsWith('.AppImage'))
            ?.browser_download_url || null;
        this.downloads.forEach((d) => {
          d.isAvailable = !!d.url;
          d.isLoading = false;
        });
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.versionTag = 'No se pudieron cargar las descargas. Intenta más tarde.';
        this.downloads.forEach((d) => {
          d.isLoading = false;
          d.isAvailable = false;
        });
        this.cdr.detectChanges();
      });
  }

  private initializePriceCalculator() {
    setTimeout(() => {
      const rfcSlider = document.getElementById('rfc-range') as HTMLInputElement;
      const macSlider = document.getElementById('mac-range') as HTMLInputElement;
      if (rfcSlider && macSlider) {
        rfcSlider.addEventListener('input', () => this.calculatePrice());
        macSlider.addEventListener('input', () => this.calculatePrice());
        this.calculatePrice();
      }
    }, 100);
  }

  private calculatePrice() {
    const rfcSlider = document.getElementById('rfc-range') as HTMLInputElement;
    const macSlider = document.getElementById('mac-range') as HTMLInputElement;
    if (!rfcSlider || !macSlider) return;

    const nRfc = parseInt(rfcSlider.value);
    const nMac = parseInt(macSlider.value);
    const BASE_IVA = 1200 * 1.16;
    const RFC_IVA = 240 * 1.16;
    const MAC_IVA = 300 * 1.16;
    let pct = nRfc > 1 ? nRfc * 0.01 : 0;
    if (pct > 0.45) pct = 0.45;

    const rfcBruto = nRfc * RFC_IVA;
    const ahorro = rfcBruto * pct;
    const subtotalAmount = BASE_IVA + rfcBruto + nMac * MAC_IVA;
    const totalFinal = subtotalAmount - ahorro;

    this.rfcCount = nRfc;
    this.machineCount = nMac;
    this.savingsPercent = `${(pct * 100).toFixed(0)}%`;

    const fmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
    this.subtotal = fmt.format(subtotalAmount);
    this.savings = `-${fmt.format(ahorro)}`;
    this.total = fmt.format(totalFinal);
  }
}

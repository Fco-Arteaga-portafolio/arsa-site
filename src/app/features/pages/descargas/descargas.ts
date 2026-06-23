import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

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
  selector: 'app-descargas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descargas.html',
  styleUrl: './descargas.css',
})
export class DescargasComponent implements OnInit {
  versionTag = 'Obteniendo última versión...';
  downloads: Download[] = [
    {
      platform: 'Windows',
      format: '.exe',
      url: null,
      isLoading: true,
      isAvailable: false,
    },
    {
      platform: 'macOS',
      format: '.dmg / .zip',
      url: null,
      isLoading: true,
      isAvailable: false,
    },
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

  constructor(private location: Location, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchReleases();
    this.scrollToTop();
  }

  fetchReleases(): void {
    fetch(this.API_URL)
      .then((response) => response.json())
      .then((data: Release) => {
        this.versionTag = `Última versión estable: ${data.tag_name}`;
        const downloads = {
          win: data.assets.find((a) => a.name.endsWith('.exe')),
          mac: data.assets.find((a) => a.name.endsWith('.dmg') || a.name.endsWith('.zip')),
          linux: data.assets.find((a) => a.name.endsWith('.deb') || a.name.endsWith('.AppImage')),
        };

        this.downloads[0].url = downloads.win?.browser_download_url || null;
        this.downloads[0].isAvailable = !!downloads.win;
        this.downloads[0].isLoading = false;

        this.downloads[1].url = downloads.mac?.browser_download_url || null;
        this.downloads[1].isAvailable = !!downloads.mac;
        this.downloads[1].isLoading = false;

        this.downloads[2].url = downloads.linux?.browser_download_url || null;
        this.downloads[2].isAvailable = !!downloads.linux;
        this.downloads[2].isLoading = false;

        this.cdr.detectChanges();
      })
      .catch((err) => {
        console.error('Error obteniendo releases:', err);
        this.versionTag = 'No se pudieron cargar las descargas. Intenta más tarde.';
        this.downloads.forEach((download) => {
          download.isLoading = false;
          download.isAvailable = false;
        });
        this.cdr.detectChanges();
      });
  }

  goBack(): void {
    this.location.back();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}

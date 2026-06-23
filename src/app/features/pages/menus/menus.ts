import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { MenuStateService } from '../../../shared/services/menu-state.service';
import { BranchHeroComponent } from '../../../shared/components/branch-hero/branch-hero';
import { CategoryTabsComponent } from '../../../shared/components/category-tabs/category-tabs';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card';
import { ImageLightboxComponent } from '../../../shared/components/image-lightbox/image-lightbox';
import type { Product } from '../../../shared/models/menu.interface';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, BranchHeroComponent, CategoryTabsComponent, ProductCardComponent, ImageLightboxComponent],
  template: `
    <ng-template #promo>
      <div class="flex flex-col items-center text-center px-4 py-12">
        <img src="/pideFacil.png" alt="Pide Fácil" class="w-28 h-28 mb-4" />
        <h3 class="text-xl font-bold text-gray-900 mb-2">¿Buscas algo diferente?</h3>
        <p class="text-gray-600 max-w-sm mb-6 leading-relaxed">
          Descarga <strong>Pide Fácil</strong>, la app de delivery donde puedes ser
          <strong>vendedor</strong>, <strong>cliente</strong> o <strong>repartidor</strong>.
        </p>
        <a routerLink="/pidefacil" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-green-600/30">
          Conoce Pide Fácil
        </a>
      </div>
    </ng-template>

    @if (!idSucursal) {
      <div class="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4 py-16">
        <img src="/pideFacil.png" alt="Pide Fácil" class="w-32 h-32 mb-6" />
        <h1 class="text-3xl font-bold text-gray-900 mb-2">¡Pide Fácil!</h1>
        <p class="text-lg text-gray-600 text-center max-w-md mb-6">
          La app de delivery donde puedes ser <strong>vendedor</strong>, <strong>cliente</strong> o <strong>repartidor</strong>.
        </p>
        <a routerLink="/pidefacil" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-600/30">
          Conoce más
        </a>
      </div>
    } @else if (state.loading()) {
      <div class="flex items-center justify-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#e74c3c]"></div>
      </div>
    } @else if (state.error()) {
      <div class="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p class="text-red-600 text-lg mb-4">{{ state.error() }}</p>
        <button (click)="goBack()" class="mb-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Volver
        </button>
        <ng-container [ngTemplateOutlet]="promo"></ng-container>
      </div>
    } @else if (state.branch()) {
      <div class="max-w-2xl mx-auto pb-8 bg-[#f8f9fc] min-h-screen padtop">
        <app-branch-hero [branch]="state.branch()!" />

        @for (menu of state.menus(); track menu.id) {
          <div class="px-4 mt-6">
            <h2 class="text-xl font-bold text-gray-900">{{ menu.name }}</h2>
            @if (menu.description) {
              <p class="text-sm text-gray-500 mt-1">{{ menu.description }}</p>
            }
          </div>
        }

        @if (hasProducts) {
          @if (state.sections().length > 1) {
            <app-category-tabs
              [sections]="state.sections()"
              [activeId]="state.activeCategoryId()"
              (onChange)="state.setActiveCategoryId($event)"
            />
          }

          @if (state.activeSection(); as section) {
            <div class="px-4 mt-4">
              @if (state.sections().length <= 1) {
                <h3 class="text-lg font-semibold text-gray-800 mb-3">{{ section.category_name }}</h3>
              }
              <div class="space-y-3">
                @for (product of section.products; track product.id) {
                  <app-product-card [product]="product" (imageClick)="openLightbox($event)" />
                }
              </div>
            </div>
          }
        } @else {
          <ng-container [ngTemplateOutlet]="promo"></ng-container>
        }
      </div>
    }

    <app-image-lightbox
      [isOpen]="lightboxOpen"
      [images]="lightboxImages"
      [(currentIndex)]="lightboxIndex"
      (closeEvent)="closeLightbox()"
      (currentIndexChange)="lightboxIndex = $event"
    />
  `,
})
export class MenusComponent implements OnInit {
  state = inject(MenuStateService);
  private route = inject(ActivatedRoute);
  idSucursal: string | null = null;

  lightboxOpen = false;
  lightboxImages: string[] = [];
  lightboxIndex = 0;

  get hasProducts(): boolean {
    return this.state.sections().some((s) => s.products.length > 0);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idSucursal = params.get('idSucursal');
      if (this.idSucursal) this.state.loadMenu(this.idSucursal);
    });
  }

  openLightbox(product: Product): void {
    const images = [product.url_image, ...product.images.map((i) => i.url_image)].filter(
      (url) => url,
    );
    const unique = [...new Set(images)];
    if (unique.length === 0) return;
    this.lightboxImages = unique;
    this.lightboxIndex = 0;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.lightboxImages = [];
  }

  goBack(): void {
    window.history.back();
  }
}

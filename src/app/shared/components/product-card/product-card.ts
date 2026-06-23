import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { Product } from '../../models/menu.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div class="w-full sm:w-[120px] h-[120px] sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden cursor-pointer" (click)="onImageClick()">
        @if (!imgError) {
          <img
            [src]="product.url_image"
            (error)="imgError = true"
            [alt]="product.name"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        } @else {
          <div class="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
        }
      </div>
      <div class="flex-1 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ product.name }}</h3>
        @if (product.description) {
          <div>
            <p
              class="text-sm text-gray-600 leading-relaxed cursor-pointer select-none"
              [class.line-clamp-2]="!expanded"
              (click)="toggleExpand()"
            >
              {{ product.description }}
            </p>
            @if (product.description.length > 60) {
              <button
                (click)="toggleExpand()"
                class="text-xs text-blue-600 hover:text-blue-700 mt-1 font-medium"
              >
                {{ expanded ? 'Ver menos' : 'Ver más' }}
              </button>
            }
          </div>
        }
        <div class="mt-2 flex items-center gap-2">
          @if (product.is_offer_active && product.offer_price) {
            <span class="text-lg font-bold text-[#e74c3c]">{{ formatPrice(product.offer_price) }}</span>
            <span class="text-sm text-gray-400 line-through">{{ formatPrice(product.price) }}</span>
          } @else {
            <span class="text-lg font-bold text-gray-900">{{ formatPrice(product.price) }}</span>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() imageClick = new EventEmitter<Product>();
  expanded = false;
  imgError = false;

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  onImageClick(): void {
    if (!this.imgError) this.imageClick.emit(this.product);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(price);
  }
}

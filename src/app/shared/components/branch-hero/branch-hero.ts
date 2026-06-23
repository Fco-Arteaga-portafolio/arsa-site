import { Component, Input } from '@angular/core';
import type { Branch } from '../../models/menu.interface';

@Component({
  selector: 'app-branch-hero',
  standalone: true,
  template: `
    <div class="relative w-full h-64 md:h-80 overflow-hidden bg-[#1a1a2e]">
      <img
        [src]="branch.url_image"
        (error)="onImgError($event)"
        [alt]="branch.name"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-5">
        <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4 bg-gray-600 flex items-center justify-center text-3xl font-bold">
          @if (!avatarError) {
            <img
              [src]="branch.url_image"
              (error)="avatarError = true"
              [alt]="branch.name"
              class="w-full h-full object-cover"
            />
          } @else {
            <span>{{ branch.name.charAt(0) }}</span>
          }
        </div>
        <h1 class="text-2xl md:text-4xl font-bold mb-2 text-center">{{ branch.name }}</h1>
        @if (branch.description) {
          <p class="text-sm md:text-base text-gray-200 text-center max-w-md mb-2">{{ branch.description }}</p>
        }
        @if (branch.phone) {
          <a [href]="'tel:' + branch.phone" class="text-blue-300 telefo hover:text-blue-200 underline text-sm">
            {{ branch.phone }}
          </a>
        }
      </div>
    </div>
  `,
})
export class BranchHeroComponent {
  @Input({ required: true }) branch!: Branch;
  avatarError = false;

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}

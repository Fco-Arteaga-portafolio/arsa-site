import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-image-lightbox',
  standalone: true,
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" (click)="close()">
        <button
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white text-2xl hover:bg-white/10 rounded-full transition-colors z-10"
          (click)="close()"
        >
          ✕
        </button>

        @if (images.length > 1) {
          <button
            class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white text-3xl hover:bg-white/10 rounded-full transition-colors z-10"
            [class.opacity-30]="currentIndex === 0"
            (click)="prev(); $event.stopPropagation()"
          >
            ‹
          </button>
          <button
            class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white text-3xl hover:bg-white/10 rounded-full transition-colors z-10"
            [class.opacity-30]="currentIndex === images.length - 1"
            (click)="next(); $event.stopPropagation()"
          >
            ›
          </button>
        }

        <img
          [src]="images[currentIndex]"
          class="max-w-[90vw] max-h-[90vh] object-contain select-none"
          (click)="$event.stopPropagation()"
        />

        @if (images.length > 1) {
          <div class="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        }
      </div>
    }
  `,
})
export class ImageLightboxComponent {
  @Input() isOpen = false;
  @Input() images: string[] = [];
  @Input() currentIndex = 0;
  @Output() currentIndexChange = new EventEmitter<number>();
  @Output() closeEvent = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.close();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    if (this.isOpen) this.prev();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    if (this.isOpen) this.next();
  }

  close(): void {
    this.closeEvent.emit();
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentIndexChange.emit(this.currentIndex);
    }
  }

  next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.currentIndexChange.emit(this.currentIndex);
    }
  }
}

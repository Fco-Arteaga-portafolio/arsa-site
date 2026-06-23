import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { Section } from '../../models/menu.interface';

@Component({
  selector: 'app-category-tabs',
  standalone: true,
  template: `
    <div class="overflow-x-auto whitespace-nowrap py-4 px-4" style="-webkit-overflow-scrolling: touch">
      <div class="flex gap-2">
        @for (section of sections; track section.category_id) {
          <button
            (click)="onChange.emit(section.category_id)"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
            [class]="section.category_id === activeId
              ? 'bg-[#e74c3c] text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            {{ section.category_name }}
          </button>
        }
      </div>
    </div>
  `,
})
export class CategoryTabsComponent {
  @Input({ required: true }) sections: Section[] = [];
  @Input() activeId: number | null = null;
  @Output() onChange = new EventEmitter<number>();
}

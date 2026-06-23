import { Injectable, signal } from '@angular/core';
import { MenuService } from './menu.service';
import type { Branch, Menu, Section } from '../models/menu.interface';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  branch = signal<Branch | null>(null);
  menus = signal<Menu[]>([]);
  sections = signal<Section[]>([]);
  activeSection = signal<Section | null>(null);
  activeCategoryId = signal<number | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private menuService: MenuService) {}

  async loadMenu(idSucursal: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    this.branch.set(null);
    this.menus.set([]);
    this.sections.set([]);
    this.activeSection.set(null);
    this.activeCategoryId.set(null);

    try {
      const response = await this.menuService.getByBranch(idSucursal);
      const { branch, menus } = response.data;
      this.branch.set(branch);
      this.menus.set(menus);
      const sections = menus.flatMap((m) => m.sections);
      this.sections.set(sections);
      if (sections.length > 0) {
        this.activeSection.set(sections[0]);
        this.activeCategoryId.set(sections[0].category_id);
      }
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'Error al cargar el menú',
      );
    } finally {
      this.loading.set(false);
    }
  }

  setActiveCategoryId(id: number): void {
    this.activeCategoryId.set(id);
    const section = this.sections().find((s) => s.category_id === id);
    if (section) this.activeSection.set(section);
  }
}

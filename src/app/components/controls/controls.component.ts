import { Component, inject, computed, signal, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Palette } from '../../models/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state.service';
import { BACKGROUNDS, BG_CATEGORIES, BG_PARAMS } from '../../models/backgrounds';
import { SECTIONS } from '../../models/sections';
import { BgDef, FavoriteItem } from '../../models/types';
import { PALETTE_PRESETS } from '../../models/palette-presets';

const TILE_STAGE_WIDTH = 600;
const TILE_STAGE_HEIGHT = 400;

function tilePreviewStyle(style: Record<string, string>): Record<string, string> {
  const { position, overflow, ...rest } = style;
  return rest;
}

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controls.component.html',
})
export class ControlsComponent implements AfterViewInit, OnDestroy {
  readonly svc = inject(AppStateService);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly sections = SECTIONS;
  readonly bgCategories = BG_CATEGORIES;
  readonly backgrounds = BACKGROUNDS;
  readonly palettePresets = PALETTE_PRESETS;

  readonly openSections = signal<Record<string, boolean>>({
    section: true, background: true, palette: true, advanced: false, content: false, favorites: true,
  });

  readonly tileStageWidth = TILE_STAGE_WIDTH;
  readonly tileStageHeight = TILE_STAGE_HEIGHT;
  private readonly tileWidth = signal(135);
  readonly tileScale = computed(() => this.tileWidth() / TILE_STAGE_WIDTH);

  private resizeObserver?: ResizeObserver;

  readonly byCat = computed(() =>
    BG_CATEGORIES.map(cat => ({
      ...cat,
      items: BACKGROUNDS.filter(b => b.category === cat.id),
    }))
  );

  readonly params = computed(() => BG_PARAMS[this.svc.state().bgId] || []);

  ngAfterViewInit(): void {
    const el = this.host.nativeElement as HTMLElement;
    const measure = () => {
      // Tiles live in a 2-column grid inside `px-5` padding (20px each side) with a 6px gap.
      const w = el.getBoundingClientRect().width;
      this.tileWidth.set(Math.max(40, (w - 40 - 6) / 2));
    };
    measure();
    this.resizeObserver = new ResizeObserver(measure);
    this.resizeObserver.observe(el);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  toggle(key: string): void {
    this.openSections.update(s => ({ ...s, [key]: !s[key] }));
  }

  isOpen(key: string): boolean {
    return !!this.openSections()[key];
  }

  bgRenderedStyle(bg: BgDef): Record<string, string> {
    return tilePreviewStyle(bg.render(bg.defaults, this.svc.state().palette).style);
  }

  bgRenderedLayers(bg: BgDef) {
    return bg.render(bg.defaults, this.svc.state().palette).layers;
  }

  objectEntries(obj: Record<string, string>) {
    return Object.entries(obj);
  }

  labelFor(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').trim();
  }

  isLong(v: string): boolean {
    return v.length > 60;
  }

  trackById(_: number, item: { id: string }) { return item.id; }
  trackByKey(_: number, item: [string, string]) { return item[0]; }

  getPaletteValue(key: string): string {
    return this.svc.state().palette[key as keyof Palette] ?? '';
  }

  getBgOptValue(key: string): unknown {
    return this.svc.state().bgOpts[key];
  }

  getSliderValue(key: string, min: number): number {
    const v = this.svc.state().bgOpts[key];
    return typeof v === 'number' ? v : min;
  }

  getToggleValue(key: string): boolean {
    return !!this.svc.state().bgOpts[key];
  }

  getColorOverride(key: string, fallback: string): string {
    const v = this.svc.state().bgOpts[key];
    return (typeof v === 'string' && v) ? v : fallback;
  }

  favoriteRenderedStyle(fav: FavoriteItem) {
    const def = BACKGROUNDS.find(b => b.id === fav.bgId);
    if (!def) return {};
    return tilePreviewStyle(def.render(def.defaults, fav.palette).style);
  }

  favoriteRenderedLayers(fav: FavoriteItem) {
    const def = BACKGROUNDS.find(b => b.id === fav.bgId);
    if (!def) return undefined;
    return def.render(def.defaults, fav.palette).layers;
  }

  favoriteName(fav: FavoriteItem): string {
    const def = BACKGROUNDS.find(b => b.id === fav.bgId);
    return def?.name ?? fav.bgId;
  }

  onSliderChange(key: string, event: Event): void {
    const el = event.target as HTMLInputElement;
    this.svc.updateBgOpt(key, parseFloat(el.value));
  }

  onColorOverride(key: string, value: string): void {
    this.svc.updateBgOpt(key, value);
  }

  onPaletteInput(key: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.svc.updatePalette(key as keyof Palette, value);
  }
}

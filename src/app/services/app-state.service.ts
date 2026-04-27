import { Injectable, signal, computed } from '@angular/core';
import { AppState, Palette, FavoriteItem, Viewport, SectionContent } from '../models/types';
import { BACKGROUNDS } from '../models/backgrounds';
import { SECTIONS } from '../models/sections';
import { lsGet, lsSet, copyText } from '../utils/color.utils';

const DEFAULT_PALETTE: Palette = {
  primary: '#14b8a6',
  secondary: '#0ea5e9',
  accent: '#a855f7',
  bg: '#0a0a0b',
  fg: '#f5f5f7',
};

function initialState(): AppState {
  const sectionId = 'hero-centered';
  const bgId = 'mesh-soft';
  const bgDef = BACKGROUNDS.find(b => b.id === bgId)!;
  const sectionDef = SECTIONS.find(s => s.id === sectionId)!;
  return {
    sectionId,
    bgId,
    bgOpts: { ...bgDef.defaults },
    palette: { ...DEFAULT_PALETTE },
    content: { ...sectionDef.defaults },
    dark: true,
    viewport: 'desktop',
    favorites: lsGet<FavoriteItem[]>('bd-favorites', []),
  };
}

export function buildOutput(state: AppState): string {
  const bgDef = BACKGROUNDS.find(b => b.id === state.bgId)!;
  const sectionDef = SECTIONS.find(s => s.id === state.sectionId)!;
  const bg = bgDef.generateCode(state.bgOpts, state.palette);
  const sectionMarkup = sectionDef.generateMarkup({ palette: state.palette, content: state.content, dark: state.dark });

  const classes = ['relative', 'overflow-hidden', bg.wrapperClass].filter(Boolean).join(' ');
  const styleAttr = bg.wrapperStyle ? ` style="${bg.wrapperStyle}"` : '';
  const bgLayers = bg.layers || '';
  const cssBlock = bg.css ? `<style>\n${bg.css}\n</style>\n\n` : '';

  return `${cssBlock}<section class="${classes}"${styleAttr}>${bgLayers}\n${sectionMarkup}\n</section>`;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _state = signal<AppState>(initialState());

  readonly state = this._state.asReadonly();

  readonly bgDef = computed(() => BACKGROUNDS.find(b => b.id === this._state().bgId)!);
  readonly sectionDef = computed(() => SECTIONS.find(s => s.id === this._state().sectionId)!);

  patch(update: Partial<AppState>): void {
    this._state.update(s => ({ ...s, ...update }));
  }

  setBg(id: string): void {
    const def = BACKGROUNDS.find(b => b.id === id)!;
    this.patch({ bgId: id, bgOpts: { ...def.defaults } });
  }

  setSection(id: string): void {
    const def = SECTIONS.find(s => s.id === id)!;
    this.patch({ sectionId: id, content: { ...def.defaults } });
  }

  updateBgOpt(key: string, value: unknown): void {
    this._state.update(s => ({ ...s, bgOpts: { ...s.bgOpts, [key]: value } }));
  }

  updatePalette(key: keyof Palette, value: string): void {
    this._state.update(s => ({ ...s, palette: { ...s.palette, [key]: value } }));
  }

  applyPreset(p: { p: string; s: string; a: string }): void {
    this._state.update(s => ({ ...s, palette: { ...s.palette, primary: p.p, secondary: p.s, accent: p.a } }));
  }

  updateContent(key: string, value: string): void {
    this._state.update(s => ({ ...s, content: { ...s.content, [key]: value } }));
  }

  toggleFavorite(): void {
    const s = this._state();
    const isFav = s.favorites.some(f => f.bgId === s.bgId && f.sectionId === s.sectionId);
    const next = isFav
      ? s.favorites.filter(f => !(f.bgId === s.bgId && f.sectionId === s.sectionId))
      : [...s.favorites, {
          id: `${s.sectionId}+${s.bgId}+${Date.now()}`,
          bgId: s.bgId, sectionId: s.sectionId,
          bgOpts: { ...s.bgOpts }, palette: { ...s.palette }, dark: s.dark,
        }];
    this.patch({ favorites: next });
    lsSet('bd-favorites', next);
  }

  removeFavorite(id: string): void {
    this._state.update(s => {
      const next = s.favorites.filter(f => f.id !== id);
      lsSet('bd-favorites', next);
      return { ...s, favorites: next };
    });
  }

  clearFavorites(): void {
    this.patch({ favorites: [] });
    lsSet('bd-favorites', []);
  }

  loadFavorite(fav: FavoriteItem): void {
    const sectionDef = SECTIONS.find(s => s.id === fav.sectionId);
    this.patch({
      bgId: fav.bgId, sectionId: fav.sectionId,
      bgOpts: { ...fav.bgOpts }, palette: { ...fav.palette },
      content: sectionDef ? { ...sectionDef.defaults } : this._state().content,
    });
  }

  randomize(): void {
    const bgList = BACKGROUNDS;
    const def = bgList[Math.floor(Math.random() * bgList.length)];
    const toHex = (h: number): string => {
      const div = document.createElement('div');
      div.style.color = `oklch(0.7 0.18 ${h})`;
      document.body.appendChild(div);
      const rgb = getComputedStyle(div).color;
      document.body.removeChild(div);
      const m = rgb.match(/\d+/g)!;
      const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
      return '#' + c(+m[0]) + c(+m[1]) + c(+m[2]);
    };
    const hues = [Math.random() * 360, Math.random() * 360, Math.random() * 360];
    this._state.update(s => ({
      ...s,
      bgId: def.id, bgOpts: { ...def.defaults },
      palette: { ...s.palette, primary: toHex(hues[0]), secondary: toHex(hues[1]), accent: toHex(hues[2]) },
    }));
  }

  async copyCode(): Promise<void> {
    await copyText(buildOutput(this._state()));
  }

  isFavorite(): boolean {
    const s = this._state();
    return s.favorites.some(f => f.bgId === s.bgId && f.sectionId === s.sectionId);
  }
}

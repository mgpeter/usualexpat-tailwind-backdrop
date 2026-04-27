export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  fg: string;
}

export interface BgRendered {
  style: Record<string, string>;
  layers?: LayerDef[];
}

export interface LayerDef {
  classes: string;
  style: Record<string, string>;
  children?: LayerDef[];
}

export interface BgCodeResult {
  wrapperStyle?: string;
  wrapperClass?: string;
  layers?: string;
  css?: string;
}

export interface BgParam {
  key: string;
  label: string;
  kind: 'slider' | 'toggle';
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

export interface BgDef {
  id: string;
  name: string;
  category: string;
  defaults: Record<string, unknown>;
  render: (opts: Record<string, unknown>, palette: Palette, ctx?: { mouseX?: number; mouseY?: number }) => BgRendered;
  generateCode: (opts: Record<string, unknown>, palette: Palette) => BgCodeResult;
}

export interface BgCategory {
  id: string;
  label: string;
}

export interface SectionContent {
  [key: string]: string;
}

export interface SectionDef {
  id: string;
  name: string;
  defaults: SectionContent;
  renderHtml: (opts: { palette: Palette; content: SectionContent; dark: boolean }) => string;
  generateMarkup: (opts: { palette: Palette; content: SectionContent; dark: boolean }) => string;
}

export interface FavoriteItem {
  id: string;
  bgId: string;
  sectionId: string;
  bgOpts: Record<string, unknown>;
  palette: Palette;
  dark: boolean;
}

export type Viewport = 'mobile' | 'tablet' | 'desktop';

export interface AppState {
  sectionId: string;
  bgId: string;
  bgOpts: Record<string, unknown>;
  palette: Palette;
  content: SectionContent;
  dark: boolean;
  viewport: Viewport;
  favorites: FavoriteItem[];
}

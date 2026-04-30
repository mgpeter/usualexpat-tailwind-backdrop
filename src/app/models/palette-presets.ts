export interface PalettePreset {
  name: string;
  p: string;
  s: string;
  a: string;
}

export const PALETTE_PRESETS: PalettePreset[] = [
  { name: 'Teal',     p: '#14b8a6', s: '#0ea5e9', a: '#a855f7' },
  { name: 'Sunset',   p: '#f97316', s: '#ec4899', a: '#8b5cf6' },
  { name: 'Forest',   p: '#22c55e', s: '#10b981', a: '#84cc16' },
  { name: 'Ocean',    p: '#3b82f6', s: '#06b6d4', a: '#6366f1' },
  { name: 'Rose',     p: '#f43f5e', s: '#ec4899', a: '#f59e0b' },
  { name: 'Mono',     p: '#71717a', s: '#a1a1aa', a: '#52525b' },
  { name: 'Twilight', p: '#6366f1', s: '#a855f7', a: '#ec4899' },
  { name: 'Cyber',    p: '#22d3ee', s: '#d946ef', a: '#a855f7' },
  { name: 'Volcano',  p: '#dc2626', s: '#ea580c', a: '#facc15' },
  { name: 'Mint',     p: '#5eead4', s: '#86efac', a: '#a5f3fc' },
  { name: 'Citrus',   p: '#84cc16', s: '#facc15', a: '#fb923c' },
  { name: 'Bordeaux', p: '#881337', s: '#7e22ce', a: '#db2777' },
  { name: 'Aurora',   p: '#34d399', s: '#22d3ee', a: '#3b82f6' },
  { name: 'Lavender', p: '#c4b5fd', s: '#f9a8d4', a: '#a5b4fc' },
  { name: 'Royal',    p: '#1e40af', s: '#7c3aed', a: '#f59e0b' },
  { name: 'Coral',    p: '#fb7185', s: '#fb923c', a: '#2dd4bf' },
  { name: 'Galaxy',   p: '#4c1d95', s: '#7c3aed', a: '#db2777' },
  { name: 'Tropical', p: '#10b981', s: '#fbbf24', a: '#06b6d4' },
];

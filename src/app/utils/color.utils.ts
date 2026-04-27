export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  if (!hex) return { r: 0, g: 0, b: 0 };
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const num = parseInt(v, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}

export function hexWithAlpha(hex: string, a: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const f = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function bestTextColor(bgHex: string): string {
  return relativeLuminance(bgHex) > 0.5 ? '#0a0a0b' : '#f5f5f7';
}

export function highlightHtml(src: string): string {
  let out = src.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  out = out.replace(/&lt;!--([\s\S]*?)--&gt;/g, (m) => `<span class="tk-cmt">${m}</span>`);
  out = out.replace(/(&lt;\/?)([a-zA-Z][\w-]*)/g, (_, lt, name) => `${lt}<span class="tk-tag">${name}</span>`);
  out = out.replace(/(\s)([a-zA-Z_:][\w:.-]*)(=)(&quot;)([^&]*?)(&quot;)/g,
    (_, sp, name, eq, q1, val, q2) =>
      `${sp}<span class="tk-attr">${name}</span>${eq}<span class="tk-str">${q1}${val}${q2}</span>`
  );
  return out;
}

export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(ta);
  }
}

export function lsGet<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export function lsSet(key: string, value: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

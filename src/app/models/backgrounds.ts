import { BgDef, BgCategory, BgParam, Palette, BgRendered } from './types';
import { hexWithAlpha } from '../utils/color.utils';

export const BG_CATEGORIES: BgCategory[] = [
  { id: 'gradient', label: 'Gradients' },
  { id: 'mesh',     label: 'Mesh / Blob' },
  { id: 'pattern',  label: 'Patterns' },
  { id: 'animated', label: 'Animated' },
];

const KF = {
  drift: `@keyframes bd-drift {
  0%   { transform: translate(0,0) scale(1); }
  33%  { transform: translate(8%,-6%) scale(1.08); }
  66%  { transform: translate(-6%,8%) scale(.95); }
  100% { transform: translate(0,0) scale(1); }
}`,
  aurora: `@keyframes bd-aurora {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}`,
  scan: `@keyframes bd-scan {
  0% { background-position: 0 0; }
  100% { background-position: 0 32px; }
}`,
  pulse: `@keyframes bd-pulse {
  0%, 100% { opacity: .55; }
  50%      { opacity: 1; }
}`,
};

export const BACKGROUNDS: BgDef[] = [
  // ── GRADIENTS ──
  {
    id: 'linear-gradient',
    name: 'Linear gradient',
    category: 'gradient',
    defaults: { angle: 135, c1: '', c2: '', c3: '', useThree: false },
    render(o, palette) {
      const a = (o['angle'] as number) ?? 135;
      const c1 = (o['c1'] as string) || palette.primary;
      const c2 = (o['c2'] as string) || palette.secondary;
      const c3 = (o['c3'] as string) || palette.accent;
      const stops = o['useThree'] ? `${c1}, ${c2}, ${c3}` : `${c1}, ${c2}`;
      return { style: { background: `linear-gradient(${a}deg, ${stops})` } };
    },
    generateCode(o, palette) {
      const a = (o['angle'] as number) ?? 135;
      const c1 = (o['c1'] as string) || palette.primary;
      const c2 = (o['c2'] as string) || palette.secondary;
      const c3 = (o['c3'] as string) || palette.accent;
      const stops = o['useThree'] ? `${c1}, ${c2}, ${c3}` : `${c1}, ${c2}`;
      return { wrapperStyle: `background: linear-gradient(${a}deg, ${stops});`, wrapperClass: '', layers: '', css: '' };
    },
  },
  {
    id: 'radial-gradient',
    name: 'Radial gradient',
    category: 'gradient',
    defaults: { posX: 50, posY: 30, size: 70, c1: '', c2: '' },
    render(o, palette) {
      const c1 = (o['c1'] as string) || palette.primary;
      const c2 = (o['c2'] as string) || palette.bg;
      return { style: { background: `radial-gradient(ellipse ${o['size']}% ${(o['size'] as number) * 0.8}% at ${o['posX']}% ${o['posY']}%, ${c1}, ${c2})` } };
    },
    generateCode(o, palette) {
      const c1 = (o['c1'] as string) || palette.primary;
      const c2 = (o['c2'] as string) || palette.bg;
      return { wrapperStyle: `background: radial-gradient(ellipse ${o['size']}% ${(o['size'] as number) * 0.8}% at ${o['posX']}% ${o['posY']}%, ${c1}, ${c2});` };
    },
  },
  {
    id: 'conic-gradient',
    name: 'Conic gradient',
    category: 'gradient',
    defaults: { angle: 0, posX: 50, posY: 50, c1: '', c2: '', c3: '' },
    render(o, palette) {
      const c1 = (o['c1'] as string) || palette.primary;
      const c2 = (o['c2'] as string) || palette.secondary;
      const c3 = (o['c3'] as string) || palette.accent;
      return { style: { background: `conic-gradient(from ${o['angle']}deg at ${o['posX']}% ${o['posY']}%, ${c1}, ${c2}, ${c3}, ${c1})` } };
    },
    generateCode(o, palette) {
      const c1 = (o['c1'] as string) || palette.primary;
      const c2 = (o['c2'] as string) || palette.secondary;
      const c3 = (o['c3'] as string) || palette.accent;
      return { wrapperStyle: `background: conic-gradient(from ${o['angle']}deg at ${o['posX']}% ${o['posY']}%, ${c1}, ${c2}, ${c3}, ${c1});` };
    },
  },

  // ── MESH / BLOB ──
  {
    id: 'mesh-soft',
    name: 'Soft mesh',
    category: 'mesh',
    defaults: { blur: 80, opacity: 0.7 },
    render(o, palette): BgRendered {
      const op = (o['opacity'] as number) ?? 0.7;
      const blur = o['blur'] as number;
      return {
        style: { background: palette.bg, position: 'relative', overflow: 'hidden' },
        layers: [
          { classes: 'absolute -top-20 -left-20 w-[55%] aspect-square rounded-full', style: { background: palette.primary, filter: `blur(${blur}px)`, opacity: String(op) } },
          { classes: 'absolute -bottom-20 -right-20 w-[55%] aspect-square rounded-full', style: { background: palette.secondary, filter: `blur(${blur}px)`, opacity: String(op) } },
          { classes: 'absolute top-1/3 right-1/4 w-[40%] aspect-square rounded-full', style: { background: palette.accent, filter: `blur(${blur}px)`, opacity: String(op * 0.85) } },
        ],
      };
    },
    generateCode(o, palette) {
      const op = (o['opacity'] as number) ?? 0.7;
      const blur = o['blur'] as number;
      return {
        wrapperStyle: `background: ${palette.bg};`,
        wrapperClass: 'relative overflow-hidden',
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute -top-20 -left-20 w-[55%] aspect-square rounded-full" style="background:${palette.primary};filter:blur(${blur}px);opacity:${op}"></div>
    <div class="absolute -bottom-20 -right-20 w-[55%] aspect-square rounded-full" style="background:${palette.secondary};filter:blur(${blur}px);opacity:${op}"></div>
    <div class="absolute top-1/3 right-1/4 w-[40%] aspect-square rounded-full" style="background:${palette.accent};filter:blur(${blur}px);opacity:${op * 0.85}"></div>
  </div>`,
      };
    },
  },
  {
    id: 'mesh-corners',
    name: 'Corner glow',
    category: 'mesh',
    defaults: { blur: 100, opacity: 0.6 },
    render(o, palette): BgRendered {
      const blur = o['blur'] as number;
      const op = o['opacity'] as number;
      return {
        style: { background: palette.bg, position: 'relative', overflow: 'hidden' },
        layers: [
          { classes: 'absolute -top-32 -left-32 w-[60%] aspect-square rounded-full', style: { background: `radial-gradient(circle, ${palette.primary}, transparent 70%)`, filter: `blur(${blur}px)`, opacity: String(op) } },
          { classes: 'absolute -bottom-32 -right-32 w-[60%] aspect-square rounded-full', style: { background: `radial-gradient(circle, ${palette.accent}, transparent 70%)`, filter: `blur(${blur}px)`, opacity: String(op) } },
        ],
      };
    },
    generateCode(o, palette) {
      const blur = o['blur'] as number;
      const op = o['opacity'] as number;
      return {
        wrapperStyle: `background: ${palette.bg};`,
        wrapperClass: 'relative overflow-hidden',
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute -top-32 -left-32 w-[60%] aspect-square rounded-full" style="background:radial-gradient(circle,${palette.primary},transparent 70%);filter:blur(${blur}px);opacity:${op}"></div>
    <div class="absolute -bottom-32 -right-32 w-[60%] aspect-square rounded-full" style="background:radial-gradient(circle,${palette.accent},transparent 70%);filter:blur(${blur}px);opacity:${op}"></div>
  </div>`,
      };
    },
  },
  {
    id: 'mesh-spotlight-static',
    name: 'Top spotlight',
    category: 'mesh',
    defaults: { spread: 60, intensity: 0.55 },
    render(o, palette) {
      return {
        style: { background: `radial-gradient(ellipse ${o['spread']}% 50% at 50% 0%, ${hexWithAlpha(palette.primary, o['intensity'] as number)}, transparent 60%), ${palette.bg}` },
      };
    },
    generateCode(o, palette) {
      return {
        wrapperStyle: `background: radial-gradient(ellipse ${o['spread']}% 50% at 50% 0%, ${hexWithAlpha(palette.primary, o['intensity'] as number)}, transparent 60%), ${palette.bg};`,
      };
    },
  },

  // ── PATTERNS ──
  {
    id: 'pattern-grid',
    name: 'Grid lines',
    category: 'pattern',
    defaults: { size: 32, opacity: 0.6, fade: true },
    render(o, palette) {
      const lineColor = hexWithAlpha(palette.fg, 0.08 * (o['opacity'] as number));
      const fade = o['fade'] as boolean;
      const fadeMask = fade ? `radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)` : null;
      return {
        style: {
          background: palette.bg,
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: `${o['size']}px ${o['size']}px`,
          ...(fadeMask ? { WebkitMaskImage: fadeMask, maskImage: fadeMask } : {}),
        },
      };
    },
    generateCode(o, palette) {
      const lineColor = hexWithAlpha(palette.fg, 0.08 * (o['opacity'] as number));
      const mask = o['fade'] ? `;-webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,black 40%,transparent 100%);mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,black 40%,transparent 100%)` : '';
      return {
        wrapperStyle: `background-color: ${palette.bg};`,
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10" style="background-image:linear-gradient(to right,${lineColor} 1px,transparent 1px),linear-gradient(to bottom,${lineColor} 1px,transparent 1px);background-size:${o['size']}px ${o['size']}px${mask}"></div>`,
      };
    },
  },
  {
    id: 'pattern-dots',
    name: 'Dot grid',
    category: 'pattern',
    defaults: { size: 20, dotSize: 1.5, opacity: 0.6, fade: true },
    render(o, palette) {
      const dotColor = hexWithAlpha(palette.fg, 0.18 * (o['opacity'] as number));
      const fade = o['fade'] as boolean;
      const fadeMask = fade ? `radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)` : null;
      return {
        style: {
          background: palette.bg,
          backgroundImage: `radial-gradient(${dotColor} ${o['dotSize']}px, transparent ${o['dotSize']}px)`,
          backgroundSize: `${o['size']}px ${o['size']}px`,
          ...(fadeMask ? { WebkitMaskImage: fadeMask, maskImage: fadeMask } : {}),
        },
      };
    },
    generateCode(o, palette) {
      const dotColor = hexWithAlpha(palette.fg, 0.18 * (o['opacity'] as number));
      const mask = o['fade'] ? `;-webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,black 40%,transparent 100%);mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,black 40%,transparent 100%)` : '';
      return {
        wrapperStyle: `background-color: ${palette.bg};`,
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10" style="background-image:radial-gradient(${dotColor} ${o['dotSize']}px,transparent ${o['dotSize']}px);background-size:${o['size']}px ${o['size']}px${mask}"></div>`,
      };
    },
  },
  {
    id: 'pattern-diag',
    name: 'Diagonal lines',
    category: 'pattern',
    defaults: { size: 14, opacity: 0.4 },
    render(o, palette) {
      const c = hexWithAlpha(palette.fg, 0.08 * (o['opacity'] as number));
      return {
        style: {
          background: palette.bg,
          backgroundImage: `repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px ${o['size']}px)`,
        },
      };
    },
    generateCode(o, palette) {
      const c = hexWithAlpha(palette.fg, 0.08 * (o['opacity'] as number));
      return { wrapperStyle: `background-color: ${palette.bg}; background-image: repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px ${o['size']}px);` };
    },
  },

  // ── ANIMATED ──
  {
    id: 'anim-blobs',
    name: 'Drifting blobs',
    category: 'animated',
    defaults: { blur: 80, opacity: 0.65, speed: 18 },
    render(o, palette): BgRendered {
      const blur = o['blur'] as number;
      const op = o['opacity'] as number;
      const speed = o['speed'] as number;
      return {
        style: { background: palette.bg, position: 'relative', overflow: 'hidden' },
        layers: [
          { classes: 'absolute top-[-20%] left-[-10%] w-[55%] aspect-square rounded-full', style: { background: palette.primary, filter: `blur(${blur}px)`, opacity: String(op), animation: `bd-drift ${speed}s ease-in-out infinite` } },
          { classes: 'absolute bottom-[-20%] right-[-10%] w-[55%] aspect-square rounded-full', style: { background: palette.secondary, filter: `blur(${blur}px)`, opacity: String(op), animation: `bd-drift ${speed * 1.3}s ease-in-out infinite reverse` } },
          { classes: 'absolute top-1/3 left-1/2 w-[40%] aspect-square rounded-full', style: { background: palette.accent, filter: `blur(${blur}px)`, opacity: String(op * 0.85), animation: `bd-drift ${speed * 0.8}s ease-in-out infinite` } },
        ],
      };
    },
    generateCode(o, palette) {
      const blur = o['blur'] as number;
      const op = o['opacity'] as number;
      const speed = o['speed'] as number;
      return {
        wrapperStyle: `background: ${palette.bg};`,
        wrapperClass: 'relative overflow-hidden',
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute top-[-20%] left-[-10%] w-[55%] aspect-square rounded-full" style="background:${palette.primary};filter:blur(${blur}px);opacity:${op};animation:bd-drift ${speed}s ease-in-out infinite"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[55%] aspect-square rounded-full" style="background:${palette.secondary};filter:blur(${blur}px);opacity:${op};animation:bd-drift ${speed * 1.3}s ease-in-out infinite reverse"></div>
    <div class="absolute top-1/3 left-1/2 w-[40%] aspect-square rounded-full" style="background:${palette.accent};filter:blur(${blur}px);opacity:${op * 0.85};animation:bd-drift ${speed * 0.8}s ease-in-out infinite"></div>
  </div>`,
        css: KF.drift,
      };
    },
  },
  {
    id: 'anim-aurora',
    name: 'Aurora wave',
    category: 'animated',
    defaults: { speed: 14, opacity: 0.85 },
    render(o, palette) {
      return {
        style: {
          background: `linear-gradient(120deg, ${palette.primary}, ${palette.secondary}, ${palette.accent}, ${palette.primary})`,
          backgroundSize: '300% 300%',
          animation: `bd-aurora ${o['speed']}s ease-in-out infinite`,
          opacity: String(o['opacity']),
        },
      };
    },
    generateCode(o, palette) {
      return {
        wrapperStyle: `background: linear-gradient(120deg, ${palette.primary}, ${palette.secondary}, ${palette.accent}, ${palette.primary}); background-size: 300% 300%; animation: bd-aurora ${o['speed']}s ease-in-out infinite;`,
        css: KF.aurora,
      };
    },
  },
  {
    id: 'anim-scan',
    name: 'Grid scan',
    category: 'animated',
    defaults: { size: 32, opacity: 0.5, speed: 4 },
    render(o, palette): BgRendered {
      const c = hexWithAlpha(palette.primary, 0.18 * (o['opacity'] as number));
      return {
        style: {
          background: palette.bg,
          backgroundImage: `linear-gradient(to right, ${c} 1px, transparent 1px), linear-gradient(to bottom, ${c} 1px, transparent 1px)`,
          backgroundSize: `${o['size']}px ${o['size']}px`,
          animation: `bd-scan ${o['speed']}s linear infinite`,
          position: 'relative',
        },
        layers: [
          { classes: 'absolute inset-0 pointer-events-none', style: { background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${hexWithAlpha(palette.primary, 0.4)}, transparent 60%)` } },
        ],
      };
    },
    generateCode(o, palette) {
      const c = hexWithAlpha(palette.primary, 0.18 * (o['opacity'] as number));
      return {
        wrapperStyle: `background-color: ${palette.bg}; background-image: linear-gradient(to right, ${c} 1px, transparent 1px), linear-gradient(to bottom, ${c} 1px, transparent 1px); background-size: ${o['size']}px ${o['size']}px; animation: bd-scan ${o['speed']}s linear infinite;`,
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10" style="background:radial-gradient(ellipse 60% 80% at 50% 0%, ${hexWithAlpha(palette.primary, 0.4)}, transparent 60%)"></div>`,
        css: KF.scan,
      };
    },
  },
  {
    id: 'anim-spotlight',
    name: 'Cursor spotlight',
    category: 'animated',
    defaults: { radius: 350, intensity: 0.55 },
    render(o, palette, ctx = {}) {
      const x = ctx.mouseX ?? 50;
      const y = ctx.mouseY ?? 30;
      return {
        style: {
          background: `radial-gradient(${o['radius']}px circle at ${x}% ${y}%, ${hexWithAlpha(palette.primary, o['intensity'] as number)}, transparent 60%), ${palette.bg}`,
          transition: 'background 80ms linear',
        },
      };
    },
    generateCode(o, palette) {
      return {
        wrapperStyle: `background: ${palette.bg};`,
        wrapperClass: 'relative overflow-hidden',
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10"
       style="background:radial-gradient(${o['radius']}px circle at var(--mx,50%) var(--my,30%), ${hexWithAlpha(palette.primary, o['intensity'] as number)}, transparent 60%);"
       data-spotlight></div>
  <script>
    (() => {
      const el = document.currentScript.previousElementSibling;
      const parent = el.parentElement;
      parent.addEventListener('pointermove', (e) => {
        const r = parent.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    })();
  <\/script>`,
      };
    },
  },
  {
    id: 'anim-pulse-orbs',
    name: 'Pulsing orbs',
    category: 'animated',
    defaults: { blur: 60, speed: 4 },
    render(o, palette): BgRendered {
      const blur = o['blur'] as number;
      const speed = o['speed'] as number;
      return {
        style: { background: palette.bg, position: 'relative', overflow: 'hidden' },
        layers: [
          { classes: 'absolute top-1/4 left-1/4 w-64 h-64 rounded-full', style: { background: palette.primary, filter: `blur(${blur}px)`, animation: `bd-pulse ${speed}s ease-in-out infinite` } },
          { classes: 'absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full', style: { background: palette.accent, filter: `blur(${blur}px)`, animation: `bd-pulse ${speed * 1.4}s ease-in-out infinite .5s` } },
        ],
      };
    },
    generateCode(o, palette) {
      const blur = o['blur'] as number;
      const speed = o['speed'] as number;
      return {
        wrapperStyle: `background: ${palette.bg};`,
        wrapperClass: 'relative overflow-hidden',
        layers: `
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full" style="background:${palette.primary};filter:blur(${blur}px);animation:bd-pulse ${speed}s ease-in-out infinite"></div>
    <div class="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full" style="background:${palette.accent};filter:blur(${blur}px);animation:bd-pulse ${speed * 1.4}s ease-in-out infinite .5s"></div>
  </div>`,
        css: KF.pulse,
      };
    },
  },
];

export const BG_PARAMS: Record<string, BgParam[]> = {
  'linear-gradient': [
    { key: 'angle', label: 'Angle', kind: 'slider', min: 0, max: 360, step: 1, suffix: '°' },
    { key: 'useThree', label: '3-color', kind: 'toggle' },
  ],
  'radial-gradient': [
    { key: 'posX', label: 'X position', kind: 'slider', min: 0, max: 100, step: 1, suffix: '%' },
    { key: 'posY', label: 'Y position', kind: 'slider', min: 0, max: 100, step: 1, suffix: '%' },
    { key: 'size', label: 'Size', kind: 'slider', min: 20, max: 120, step: 1, suffix: '%' },
  ],
  'conic-gradient': [
    { key: 'angle', label: 'Start angle', kind: 'slider', min: 0, max: 360, step: 1, suffix: '°' },
    { key: 'posX', label: 'X position', kind: 'slider', min: 0, max: 100, step: 1, suffix: '%' },
    { key: 'posY', label: 'Y position', kind: 'slider', min: 0, max: 100, step: 1, suffix: '%' },
  ],
  'mesh-soft': [
    { key: 'blur', label: 'Blur', kind: 'slider', min: 20, max: 200, step: 2, suffix: 'px' },
    { key: 'opacity', label: 'Opacity', kind: 'slider', min: 0.1, max: 1, step: 0.05 },
  ],
  'mesh-corners': [
    { key: 'blur', label: 'Blur', kind: 'slider', min: 30, max: 200, step: 2, suffix: 'px' },
    { key: 'opacity', label: 'Opacity', kind: 'slider', min: 0.1, max: 1, step: 0.05 },
  ],
  'mesh-spotlight-static': [
    { key: 'spread', label: 'Spread', kind: 'slider', min: 30, max: 120, step: 1, suffix: '%' },
    { key: 'intensity', label: 'Intensity', kind: 'slider', min: 0.1, max: 1, step: 0.05 },
  ],
  'pattern-grid': [
    { key: 'size', label: 'Cell size', kind: 'slider', min: 12, max: 80, step: 1, suffix: 'px' },
    { key: 'opacity', label: 'Strength', kind: 'slider', min: 0.2, max: 1.5, step: 0.05 },
    { key: 'fade', label: 'Vignette fade', kind: 'toggle' },
  ],
  'pattern-dots': [
    { key: 'size', label: 'Spacing', kind: 'slider', min: 10, max: 60, step: 1, suffix: 'px' },
    { key: 'dotSize', label: 'Dot size', kind: 'slider', min: 0.5, max: 4, step: 0.1, suffix: 'px' },
    { key: 'opacity', label: 'Strength', kind: 'slider', min: 0.2, max: 1.5, step: 0.05 },
    { key: 'fade', label: 'Vignette fade', kind: 'toggle' },
  ],
  'pattern-diag': [
    { key: 'size', label: 'Spacing', kind: 'slider', min: 6, max: 40, step: 1, suffix: 'px' },
    { key: 'opacity', label: 'Strength', kind: 'slider', min: 0.2, max: 1.5, step: 0.05 },
  ],
  'anim-blobs': [
    { key: 'blur', label: 'Blur', kind: 'slider', min: 30, max: 150, step: 2, suffix: 'px' },
    { key: 'opacity', label: 'Opacity', kind: 'slider', min: 0.1, max: 1, step: 0.05 },
    { key: 'speed', label: 'Speed', kind: 'slider', min: 6, max: 40, step: 1, suffix: 's' },
  ],
  'anim-aurora': [
    { key: 'speed', label: 'Speed', kind: 'slider', min: 4, max: 30, step: 1, suffix: 's' },
    { key: 'opacity', label: 'Opacity', kind: 'slider', min: 0.3, max: 1, step: 0.05 },
  ],
  'anim-scan': [
    { key: 'size', label: 'Cell size', kind: 'slider', min: 16, max: 80, step: 2, suffix: 'px' },
    { key: 'opacity', label: 'Strength', kind: 'slider', min: 0.3, max: 1.5, step: 0.05 },
    { key: 'speed', label: 'Speed', kind: 'slider', min: 1, max: 10, step: 0.5, suffix: 's' },
  ],
  'anim-spotlight': [
    { key: 'radius', label: 'Radius', kind: 'slider', min: 150, max: 700, step: 10, suffix: 'px' },
    { key: 'intensity', label: 'Intensity', kind: 'slider', min: 0.2, max: 1, step: 0.05 },
  ],
  'anim-pulse-orbs': [
    { key: 'blur', label: 'Blur', kind: 'slider', min: 30, max: 120, step: 2, suffix: 'px' },
    { key: 'speed', label: 'Speed', kind: 'slider', min: 2, max: 10, step: 0.5, suffix: 's' },
  ],
};

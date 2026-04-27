import { SectionDef, Palette, SectionContent } from './types';
import { bestTextColor } from '../utils/color.utils';

function fgSub(dark: boolean): { fg: string; sub: string } {
  return {
    fg: dark ? '#f5f5f7' : '#0a0a0b',
    sub: dark ? 'rgba(245,245,247,.7)' : 'rgba(10,10,11,.65)',
  };
}

export const SECTIONS: SectionDef[] = [
  {
    id: 'hero-centered',
    name: 'Centered hero',
    defaults: {
      eyebrow: 'NEW · v2.0 RELEASE',
      headline: 'Ship beautiful UI in half the time.',
      sub: 'A backgrounds library and section generator that gets out of your way. Copy, paste, ship.',
      cta1: 'Start building',
      cta2: 'View on GitHub',
    },
    renderHtml({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const accentText = bestTextColor(palette.primary);
      const eyebrow = content['eyebrow']
        ? `<div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-6 text-xs font-mono tracking-wider"
             style="border-color:${dark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.12)'};color:${fg};background:${dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.6)'}">
             <span style="width:6px;height:6px;border-radius:50%;background:${palette.primary};display:inline-block"></span>
             ${content['eyebrow']}
           </div>` : '';
      return `<div style="position:relative;z-index:10;margin:0 auto;max-width:48rem;padding:6rem 1.5rem;text-align:center">
  ${eyebrow}
  <h1 style="font-size:clamp(2.5rem,6vw,3.75rem);font-weight:600;letter-spacing:-0.025em;color:${fg}">${content['headline']}</h1>
  <p style="margin-top:1.5rem;font-size:1.125rem;color:${sub}">${content['sub']}</p>
  <div style="margin-top:2.5rem;display:flex;align-items:center;justify-content:center;gap:.75rem">
    <button style="padding:.625rem 1.25rem;border-radius:.5rem;font-size:.875rem;font-weight:500;background:${palette.primary};color:${accentText};border:none;cursor:pointer">${content['cta1']}</button>
    <button style="padding:.625rem 1.25rem;border-radius:.5rem;font-size:.875rem;font-weight:500;border:1px solid ${dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.15)'};color:${fg};background:transparent;cursor:pointer">${content['cta2']}</button>
  </div>
</div>`;
    },
    generateMarkup({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const accentText = bestTextColor(palette.primary);
      const eyebrow = content['eyebrow']
        ? `\n    <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-6 text-xs font-mono tracking-wider"
         style="border-color:${dark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.12)'};color:${fg};background:${dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.6)'}">
      <span class="size-1.5 rounded-full" style="background:${palette.primary}"></span>
      ${content['eyebrow']}
    </div>` : '';
      return `  <div class="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">${eyebrow}
    <h1 class="text-5xl md:text-6xl font-semibold tracking-tight" style="color:${fg};letter-spacing:-0.025em">
      ${content['headline']}
    </h1>
    <p class="mt-6 text-lg" style="color:${sub}">${content['sub']}</p>
    <div class="mt-10 flex items-center justify-center gap-3">
      <button class="px-5 py-2.5 rounded-lg text-sm font-medium" style="background:${palette.primary};color:${accentText}">${content['cta1']}</button>
      <button class="px-5 py-2.5 rounded-lg text-sm font-medium border" style="border-color:${dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.15)'};color:${fg}">${content['cta2']}</button>
    </div>
  </div>`;
    },
  },

  {
    id: 'hero-signup',
    name: 'Hero + signup',
    defaults: {
      eyebrow: 'EARLY ACCESS',
      headline: 'Backgrounds, born from a single click.',
      sub: 'Join 12,400 designers shipping prettier marketing pages this quarter.',
      placeholder: 'you@company.com',
      cta1: 'Request invite',
    },
    renderHtml({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const accentText = bestTextColor(palette.primary);
      const eyebrow = content['eyebrow']
        ? `<div style="font-size:.75rem;font-family:monospace;letter-spacing:.2em;margin-bottom:1rem;color:${palette.primary}">${content['eyebrow']}</div>`
        : '';
      return `<div style="position:relative;z-index:10;margin:0 auto;max-width:42rem;padding:6rem 1.5rem;text-align:center">
  ${eyebrow}
  <h1 style="font-size:clamp(2.5rem,6vw,3.75rem);font-weight:600;letter-spacing:-0.025em;color:${fg}">${content['headline']}</h1>
  <p style="margin-top:1.25rem;font-size:1rem;color:${sub}">${content['sub']}</p>
  <form style="margin-top:2.5rem;margin-left:auto;margin-right:auto;display:flex;max-width:28rem;gap:.5rem;padding:.375rem;border-radius:9999px;background:${dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.7)'};border:1px solid ${dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)'}">
    <input type="email" placeholder="${content['placeholder']}" style="flex:1;background:transparent;padding:0 1rem;outline:none;font-size:.875rem;color:${fg};border:none" />
    <button type="submit" style="padding:.625rem 1.25rem;border-radius:9999px;font-size:.875rem;font-weight:500;background:${palette.primary};color:${accentText};border:none;cursor:pointer;white-space:nowrap">${content['cta1']}</button>
  </form>
  <p style="margin-top:.75rem;font-size:.75rem;color:${dark ? 'rgba(245,245,247,.4)' : 'rgba(10,10,11,.45)'}">No spam. Unsubscribe any time.</p>
</div>`;
    },
    generateMarkup({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const accentText = bestTextColor(palette.primary);
      return `  <div class="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
    ${content['eyebrow'] ? `<div class="text-xs font-mono tracking-[0.2em] mb-4" style="color:${palette.primary}">${content['eyebrow']}</div>` : ''}
    <h1 class="text-5xl md:text-6xl font-semibold tracking-tight" style="color:${fg};letter-spacing:-0.025em">${content['headline']}</h1>
    <p class="mt-5 text-base md:text-lg" style="color:${sub}">${content['sub']}</p>
    <form class="mt-10 mx-auto flex max-w-md gap-2 p-1.5 rounded-full"
          style="background:${dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.7)'};border:1px solid ${dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)'}">
      <input type="email" placeholder="${content['placeholder']}" class="flex-1 bg-transparent px-4 outline-none text-sm" style="color:${fg}" />
      <button type="submit" class="px-5 py-2.5 rounded-full text-sm font-medium" style="background:${palette.primary};color:${accentText}">${content['cta1']}</button>
    </form>
    <p class="mt-3 text-xs" style="color:${dark ? 'rgba(245,245,247,.4)' : 'rgba(10,10,11,.45)'}">No spam. Unsubscribe any time.</p>
  </div>`;
    },
  },

  {
    id: 'cta-banner',
    name: 'CTA banner',
    defaults: {
      headline: 'Ready to make the web look good again?',
      sub: 'Free during beta.',
      cta1: 'Start free',
      cta2: 'Book a demo',
    },
    renderHtml({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const accentText = bestTextColor(palette.primary);
      return `<div style="position:relative;z-index:10;margin:0 auto;max-width:80rem;padding:5rem 1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:2rem">
  <div>
    <h2 style="font-size:clamp(1.875rem,4vw,2.25rem);font-weight:600;letter-spacing:-0.02em;color:${fg}">${content['headline']}</h2>
    <p style="margin-top:.5rem;color:${sub}">${content['sub']}</p>
  </div>
  <div style="display:flex;gap:.75rem;flex-shrink:0">
    <button style="padding:.625rem 1.25rem;border-radius:.5rem;font-size:.875rem;font-weight:500;background:${palette.primary};color:${accentText};border:none;cursor:pointer">${content['cta1']}</button>
    <button style="padding:.625rem 1.25rem;border-radius:.5rem;font-size:.875rem;font-weight:500;border:1px solid ${dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.15)'};color:${fg};background:transparent;cursor:pointer">${content['cta2']}</button>
  </div>
</div>`;
    },
    generateMarkup({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const accentText = bestTextColor(palette.primary);
      return `  <div class="relative z-10 mx-auto max-w-5xl px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
    <div class="text-center md:text-left">
      <h2 class="text-3xl md:text-4xl font-semibold tracking-tight" style="color:${fg};letter-spacing:-0.02em">${content['headline']}</h2>
      <p class="mt-2" style="color:${sub}">${content['sub']}</p>
    </div>
    <div class="flex gap-3 shrink-0">
      <button class="px-5 py-2.5 rounded-lg text-sm font-medium" style="background:${palette.primary};color:${accentText}">${content['cta1']}</button>
      <button class="px-5 py-2.5 rounded-lg text-sm font-medium border" style="border-color:${dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.15)'};color:${fg}">${content['cta2']}</button>
    </div>
  </div>`;
    },
  },

  {
    id: 'feature-grid',
    name: 'Feature grid',
    defaults: {
      headline: 'Everything in one tiny tool.',
      sub: 'No plugins, no build step. Just markup.',
      f1Title: 'Gradients',
      f1Body: 'Linear, radial, conic. Tweak angle, position, and color stops live.',
      f2Title: 'Patterns',
      f2Body: 'Grids, dots, diagonals — with proper vignette masks baked in.',
      f3Title: 'Animated',
      f3Body: 'Drifting blobs, auroras, scans, cursor spotlights. CSS-only.',
    },
    renderHtml({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const cardBg = dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.7)';
      const cardBorder = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)';
      const card = (title: string, body: string, color: string) =>
        `<div style="border-radius:1rem;border:1px solid ${cardBorder};padding:1.5rem;background:${cardBg};backdrop-filter:blur(8px)">
          <div style="width:2.25rem;height:2.25rem;border-radius:.5rem;margin-bottom:1.25rem;display:grid;place-items:center;background:${color}">
            <div style="width:.75rem;height:.75rem;border-radius:.25rem;background:rgba(255,255,255,.9)"></div>
          </div>
          <h3 style="font-size:1.125rem;font-weight:600;color:${fg}">${title}</h3>
          <p style="margin-top:.5rem;font-size:.875rem;line-height:1.6;color:${sub}">${body}</p>
        </div>`;
      return `<div style="position:relative;z-index:10;margin:0 auto;max-width:72rem;padding:6rem 1.5rem">
  <div style="text-align:center;margin-bottom:3.5rem;max-width:42rem;margin-left:auto;margin-right:auto">
    <h2 style="font-size:clamp(2rem,5vw,3rem);font-weight:600;letter-spacing:-0.02em;color:${fg}">${content['headline']}</h2>
    <p style="margin-top:1rem;color:${sub}">${content['sub']}</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem">
    ${card(content['f1Title'], content['f1Body'], palette.primary)}
    ${card(content['f2Title'], content['f2Body'], palette.secondary)}
    ${card(content['f3Title'], content['f3Body'], palette.accent)}
  </div>
</div>`;
    },
    generateMarkup({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const cardBg = dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.7)';
      const cardBorder = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)';
      const card = (t: string, b: string, c: string) =>
        `      <div class="rounded-2xl border p-6 backdrop-blur" style="background:${cardBg};border-color:${cardBorder}">
        <div class="size-9 rounded-lg mb-5 grid place-items-center" style="background:${c}">
          <div class="size-3 rounded-sm bg-white/90"></div>
        </div>
        <h3 class="text-lg font-semibold" style="color:${fg}">${t}</h3>
        <p class="mt-2 text-sm leading-relaxed" style="color:${sub}">${b}</p>
      </div>`;
      return `  <div class="relative z-10 mx-auto max-w-6xl px-6 py-24">
    <div class="text-center mb-14 max-w-2xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-semibold tracking-tight" style="color:${fg};letter-spacing:-0.02em">${content['headline']}</h2>
      <p class="mt-4" style="color:${sub}">${content['sub']}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-4">
${card(content['f1Title'], content['f1Body'], palette.primary)}
${card(content['f2Title'], content['f2Body'], palette.secondary)}
${card(content['f3Title'], content['f3Body'], palette.accent)}
    </div>
  </div>`;
    },
  },

  {
    id: 'pricing-teaser',
    name: 'Pricing teaser',
    defaults: {
      headline: 'Pricing that respects your wallet.',
      sub: 'Pay monthly, cancel any time. Volume discounts at 10+ seats.',
      tier1Name: 'Hobby',
      tier1Price: '$0',
      tier1Cta: 'Start free',
      tier2Name: 'Pro',
      tier2Price: '$12',
      tier2Cta: 'Get Pro',
      tier3Name: 'Team',
      tier3Price: '$48',
      tier3Cta: 'Contact us',
    },
    renderHtml({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const cardBg = dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.7)';
      const cardBorder = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)';
      const accentText = bestTextColor(palette.primary);

      const hexAlpha = (hex: string, a: number) => {
        const h = hex.replace('#', '');
        const v = h.length === 3 ? h.split('').map((c: string) => c + c).join('') : h;
        const num = parseInt(v, 16);
        const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
        return `rgba(${r},${g},${b},${a})`;
      };

      const tier = (name: string, price: string, cta: string, hi: boolean) =>
        `<div style="border-radius:1rem;padding:1.5rem;backdrop-filter:blur(8px);background:${hi ? hexAlpha(palette.primary, 0.12) : cardBg};border:1px solid ${hi ? palette.primary : cardBorder}">
          <div style="font-size:.75rem;font-family:monospace;letter-spacing:.1em;text-transform:uppercase;color:${hi ? palette.primary : sub}">${name}</div>
          <div style="margin-top:1rem;display:flex;align-items:baseline;gap:.25rem">
            <span style="font-size:2.25rem;font-weight:600;color:${fg}">${price}</span>
            <span style="font-size:.875rem;color:${sub}">/mo</span>
          </div>
          <ul style="margin-top:1.25rem;display:flex;flex-direction:column;gap:.5rem;font-size:.875rem;color:${sub};list-style:none;padding:0">
            <li>• Unlimited backgrounds</li>
            <li>• Copy as HTML / JSX</li>
            <li>• Save favorites</li>
          </ul>
          <button style="margin-top:1.5rem;width:100%;padding:.625rem 0;border-radius:.5rem;font-size:.875rem;font-weight:500;cursor:pointer;${hi ? `background:${palette.primary};color:${accentText};border:none` : `background:transparent;color:${fg};border:1px solid ${dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.15)'}`}">${cta}</button>
        </div>`;

      return `<div style="position:relative;z-index:10;margin:0 auto;max-width:64rem;padding:6rem 1.5rem">
  <div style="text-align:center;margin-bottom:3.5rem;max-width:36rem;margin-left:auto;margin-right:auto">
    <h2 style="font-size:clamp(2rem,5vw,3rem);font-weight:600;letter-spacing:-0.02em;color:${fg}">${content['headline']}</h2>
    <p style="margin-top:1rem;color:${sub}">${content['sub']}</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem">
    ${tier(content['tier1Name'], content['tier1Price'], content['tier1Cta'], false)}
    ${tier(content['tier2Name'], content['tier2Price'], content['tier2Cta'], true)}
    ${tier(content['tier3Name'], content['tier3Price'], content['tier3Cta'], false)}
  </div>
</div>`;
    },
    generateMarkup({ palette, content, dark }) {
      const { fg, sub } = fgSub(dark);
      const cardBg = dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.7)';
      const cardBorder = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)';
      const accentText = bestTextColor(palette.primary);
      const hexAlpha = (hex: string, a: number) => {
        const h = hex.replace('#', '');
        const v = h.length === 3 ? h.split('').map((c: string) => c + c).join('') : h;
        const num = parseInt(v, 16);
        const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
        return `rgba(${r},${g},${b},${a})`;
      };
      const tier = (name: string, price: string, cta: string, hi: boolean) =>
        `      <div class="rounded-2xl p-6 backdrop-blur" style="background:${hi ? hexAlpha(palette.primary, 0.12) : cardBg};border:1px solid ${hi ? palette.primary : cardBorder}">
        <div class="text-xs font-mono tracking-wider uppercase" style="color:${hi ? palette.primary : sub}">${name}</div>
        <div class="mt-4 flex items-baseline gap-1">
          <span class="text-4xl font-semibold" style="color:${fg}">${price}</span>
          <span class="text-sm" style="color:${sub}">/mo</span>
        </div>
        <ul class="mt-5 space-y-2 text-sm" style="color:${sub}">
          <li>• Unlimited backgrounds</li>
          <li>• Copy as HTML / JSX</li>
          <li>• Save favorites</li>
        </ul>
        <button class="mt-6 w-full py-2.5 rounded-lg text-sm font-medium" style="${hi ? `background:${palette.primary};color:${accentText}` : `background:transparent;color:${fg};border:1px solid ${dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.15)'}`}">${cta}</button>
      </div>`;
      return `  <div class="relative z-10 mx-auto max-w-5xl px-6 py-24">
    <div class="text-center mb-14 max-w-xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-semibold tracking-tight" style="color:${fg};letter-spacing:-0.02em">${content['headline']}</h2>
      <p class="mt-4" style="color:${sub}">${content['sub']}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-4">
${tier(content['tier1Name'], content['tier1Price'], content['tier1Cta'], false)}
${tier(content['tier2Name'], content['tier2Price'], content['tier2Cta'], true)}
${tier(content['tier3Name'], content['tier3Price'], content['tier3Cta'], false)}
    </div>
  </div>`;
    },
  },
];

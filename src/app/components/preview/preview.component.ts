import { Component, inject, signal, ElementRef, ViewChild, AfterViewInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styles: [`:host { display: block; height: 100%; }`],
})
export class PreviewComponent {
  readonly svc = inject(AppStateService);
  private sanitizer = inject(DomSanitizer);

  readonly mouseX = signal(50);
  readonly mouseY = signal(30);

  readonly rendered = computed(() => {
    const s = this.svc.state();
    const bgDef = this.svc.bgDef();
    const ctx = s.bgId === 'anim-spotlight'
      ? { mouseX: this.mouseX(), mouseY: this.mouseY() }
      : {};
    return bgDef.render(s.bgOpts, s.palette, ctx);
  });

  readonly sectionHtml = computed((): SafeHtml => {
    const s = this.svc.state();
    const sectionDef = this.svc.sectionDef();
    const html = sectionDef.renderHtml({ palette: s.palette, content: s.content, dark: s.dark });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  readonly viewportClass = computed(() => ({
    desktop: 'w-full',
    tablet: 'w-[820px] max-w-full',
    mobile: 'w-[400px] max-w-full',
  }[this.svc.state().viewport] || 'w-full'));

  onMouseMove(e: MouseEvent, el: HTMLElement): void {
    if (this.svc.state().bgId !== 'anim-spotlight') return;
    const rect = el.getBoundingClientRect();
    this.mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    this.mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }
}

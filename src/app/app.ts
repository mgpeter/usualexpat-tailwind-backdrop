import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from './services/app-state.service';
import { ControlsComponent } from './components/controls/controls.component';
import { PreviewComponent } from './components/preview/preview.component';
import { CodePanelComponent } from './components/code-panel/code-panel.component';
import { ToastComponent } from './components/toast/toast.component';
import { hexWithAlpha } from './utils/color.utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ControlsComponent, PreviewComponent, CodePanelComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  readonly svc = inject(AppStateService);

  panelWidth = signal(380);
  toastVisible = signal(false);
  toastMessage = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly dotPattern = `radial-gradient(${hexWithAlpha('#ffffff', 0.04)} 1px, transparent 1px)`;

  get bgDef() { return this.svc.bgDef(); }
  get sectionDef() { return this.svc.sectionDef(); }

  async handleCopy(): Promise<void> {
    await this.svc.copyCode();
    this.showToast();
  }

  showToast(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastVisible.set(true);
    this.toastMessage.set('Copied to clipboard');
    this.toastTimer = setTimeout(() => this.toastVisible.set(false), 2000);
  }

  startResize(e: MouseEvent): void {
    e.preventDefault();
    const startX = e.clientX;
    const startW = this.panelWidth();
    document.body.style.userSelect = 'none';

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      this.panelWidth.set(Math.max(320, Math.min(560, startW + dx)));
    };
    const onUp = () => {
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  setViewport(v: 'mobile' | 'tablet' | 'desktop'): void {
    this.svc.patch({ viewport: v });
  }

  setDark(dark: boolean): void {
    this.svc.patch({ dark });
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
}

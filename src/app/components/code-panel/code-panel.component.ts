import { Component, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-code-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-panel.component.html',
})
export class CodePanelComponent {
  readonly svc = inject(AppStateService);
  readonly open = signal(true);
  readonly copied = output<void>();

  readonly lineCount = computed(() => this.svc.html().split('\n').length);

  toggle(): void {
    this.open.update(v => !v);
  }

  async copy(): Promise<void> {
    await this.svc.copyCode();
    this.copied.emit();
  }
}

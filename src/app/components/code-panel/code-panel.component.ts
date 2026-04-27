import { Component, inject, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-code-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-panel.component.html',
  styles: [`:host { display: block; flex-shrink: 0; }`],
  host: {
    '[style.height.px]': 'open() ? height() : 40',
  },
})
export class CodePanelComponent {
  readonly svc = inject(AppStateService);
  readonly open = input<boolean>(true);
  readonly height = input<number>(240);
  readonly toggled = output<void>();
  readonly copied = output<void>();

  readonly lineCount = computed(() => this.svc.html().split('\n').length);

  toggle(): void {
    this.toggled.emit();
  }

  async copy(): Promise<void> {
    await this.svc.copyCode();
    this.copied.emit();
  }
}

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div class="bd-toast-enter px-4 py-2.5 rounded-lg text-sm font-medium shadow-2xl flex items-center gap-2"
             style="background:var(--accent);color:black">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          {{message()}}
        </div>
      </div>
    }
  `,
})
export class ToastComponent {
  visible = input(false);
  message = input('');
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-status-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-wrapper.component.html',
  styleUrl: './status-wrapper.component.css',
})
export class StatusWrapperComponent {
  @Input() errorMessage: string | null = 'Something Went Wrong';
  @Input() isLoading = false;
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {
  @Input() errorMessage: string | null = 'Something Went Wrong';
  @Input() isLoading = false;
}

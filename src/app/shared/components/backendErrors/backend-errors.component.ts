import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backend-errors.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'mc-backend-errors',
  templateUrl: './backend-errors.component.html',
  imports: [CommonModule],
})
export class BackendErrors implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map(
      (name: string) => `${name}: ${this.backendErrors[name].join(' ')}`
    );
  }
}

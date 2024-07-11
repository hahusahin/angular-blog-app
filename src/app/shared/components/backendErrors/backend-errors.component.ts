import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorsInterface } from '../../types';

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
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const error = this.backendErrors[name];
      return `${name}: ${Array.isArray(error) ? error.join(' ') : error}`;
    });
  }
}

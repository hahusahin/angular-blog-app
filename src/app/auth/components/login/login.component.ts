import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import { BackendErrors } from '../../../shared/components/backendErrors/backend-errors.component';

@Component({
  standalone: true,
  selector: 'mc-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrors],
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  onSubmit() {
    const request = { user: this.form.getRawValue() };
    this.store.dispatch(authActions.login({ request }));
  }
}

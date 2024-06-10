import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, filter } from 'rxjs';
import {
  selectCurrentUser,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BackendErrors } from '../../../shared/components/backendErrors/backend-errors.component';
import { authActions } from '../../store/actions';

@Component({
  selector: 'mc-settings',
  standalone: true,
  imports: [CommonModule, BackendErrors, ReactiveFormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.nonNullable.group({
    imageUrl: '',
    username: ['', Validators.required],
    bio: '',
    email: ['', [Validators.required, Validators.email]],
  });

  data$ = combineLatest({
    // currentUser: this.store.select(selectCurrentUser),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  userSubscription?: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.store
      .select(selectCurrentUser)
      .pipe(filter(Boolean))
      .subscribe((user) =>
        this.form.patchValue({
          bio: user.bio ?? '',
          email: user.email,
          imageUrl: user.image ?? '',
          username: user.username,
        })
      );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(
      authActions.updateUser({
        request: { user: { ...this.form.getRawValue() } },
      })
    );
  }

  onLogout() {
    this.store.dispatch(authActions.logout());
  }
}

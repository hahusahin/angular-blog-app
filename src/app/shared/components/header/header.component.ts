import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private store: Store) {}

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });
}

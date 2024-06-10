import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from '../store/actions';

@Component({
  selector: 'mc-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() slug: string = '';

  constructor(private store: Store) {}

  handleFavorite() {
    this.store.dispatch(
      feedActions.handleFavorites({
        isFavorited: this.isFavorited,
        slug: this.slug,
      })
    );
    if (this.isFavorited) {
      this.favoritesCount -= 1;
    } else {
      this.favoritesCount += 1;
    }
    this.isFavorited = !this.isFavorited;
  }
}

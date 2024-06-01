import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatusWrapperComponent } from '../shared/components/status-wrapper/status-wrapper.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusWrapperComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  constructor(private store: Store) {}

  @Input() apiUrl = '';

  data$ = combineLatest({
    feed: this.store.select(selectFeedData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
  }
}

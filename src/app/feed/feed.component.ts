import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest, switchMap } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { StatusWrapperComponent } from '../shared/components/status-wrapper/status-wrapper.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { environment } from '../../environments/environment';
import queryString from 'query-string';
import { ActiveTabService } from '../shared/services/active-tab.service';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StatusWrapperComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private activeTabService: ActiveTabService
  ) {}

  @Input() apiUrl = '';

  data$ = combineLatest({
    feed: this.store.select(selectFeedData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  baseUrl = this.router.url.split('?')[0];
  currentPage = 0;
  limit = environment.PAGINATION_LIMIT;
  tag: string | null = null;

  fetchFeed(urlSegment: UrlSegment[]) {
    let url = `${this.apiUrl}/articles`;
    this.activeTabService.setActiveTab('global');

    if (urlSegment[0] && urlSegment[0].path === 'feed') {
      url = `${this.apiUrl}/articles/feed`;
      this.activeTabService.setActiveTab('feed');
    }

    const queryParams = queryString.stringify({
      ...(this.currentPage > 1 && {
        offset: this.limit * (this.currentPage - 1),
        limit: this.limit,
      }),
      ...(this.tag && { tag: this.tag }),
    });

    if (this.tag) this.activeTabService.setActiveTab('popularTag');

    this.store.dispatch(
      feedActions.getFeed({ url: queryParams ? `${url}?${queryParams}` : url })
    );
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.currentPage = Number(params['page'] || '1');
          this.tag = params['tag'];
          return this.route.url;
        })
      )
      .subscribe((url) => {
        this.fetchFeed(url);
      });
  }
}

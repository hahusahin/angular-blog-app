import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, of, Subscription } from 'rxjs';
import { selectCurrentUser } from '../auth/store/reducers';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from './store/reducers';
import { ProfileInterface } from './profile.types';
import { FeedComponent } from '../feed/feed.component';
import { CurrentUserInterface } from '../shared/types';
import { userProfileActions } from './store/actions';
import { ProfileService } from './profile.service';

@Component({
  selector: 'mc-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private profileService: ProfileService
  ) {}

  slug: string = '';
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUserInterface =>
        Boolean(currentUser)
      )
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is ProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({ currentUser, userProfile }) => {
      return currentUser.username === userProfile.username;
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getProfile({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  private subscriptions: Subscription = new Subscription();

  followUser(id: number) {
    this.subscriptions.add(this.profileService.followUser(id).subscribe());
  }

  unFollowUser(id: number) {
    this.subscriptions.add(this.profileService.unFollowUser(id).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

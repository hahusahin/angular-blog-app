import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { ActiveTabService } from '../../services/active-tab.service';
import { FeedTabs } from '../../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
})
export class FeedTogglerComponent implements OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private activeTabService: ActiveTabService
  ) {}

  private activeTabSubscription: Subscription = Subscription.EMPTY;

  @Input() popularTag: string | null = null;

  currentUser$ = this.store.select(selectCurrentUser);
  activeTab: FeedTabs = 'global';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.popularTag = params['tag'];
    });
    this.activeTabSubscription = this.activeTabService.activeTab$.subscribe(
      (tab) => (this.activeTab = tab)
    );
  }

  ngOnDestroy(): void {
    this.activeTabSubscription.unsubscribe();
  }
}

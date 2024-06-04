import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedTabs } from '../types';

@Injectable({ providedIn: 'root' })
export class ActiveTabService {
  activeTab$ = new BehaviorSubject<FeedTabs>('global');

  setActiveTab(tab: FeedTabs) {
    this.activeTab$.next(tab);
  }
}

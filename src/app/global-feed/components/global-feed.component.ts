import { Component } from '@angular/core';
import { FeedComponent } from '../../shared/components/feed/feed.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.css',
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
}

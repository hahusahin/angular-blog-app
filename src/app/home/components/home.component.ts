import { Component } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { FeedComponent } from '../../feed/feed.component';

@Component({
  selector: 'mc-home',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  apiUrl = '/articles';
}

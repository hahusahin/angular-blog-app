import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { FeedComponent } from '../../feed/feed.component';
import { PopularTagsComponent } from '../../popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../../shared/components/feed-toggler/feed-toggler.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'mc-home',
  standalone: true,
  imports: [
    PopularTagsComponent,
    BannerComponent,
    FeedTogglerComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedResponse } from '../components/feed/types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string) {
    return this.http.get<FeedResponse>(environment.API_BASE_URL + url);
  }
}

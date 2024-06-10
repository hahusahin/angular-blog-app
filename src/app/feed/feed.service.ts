import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FeedResponse } from './types';
import { ArticleResponse } from '../article/types';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string) {
    return this.http.get<FeedResponse>(environment.API_BASE_URL + url);
  }

  addToFavorites(slug: string) {
    return this.http
      .post<ArticleResponse>(
        `${environment.API_BASE_URL}/articles/${slug}/favorite`,
        {}
      )
      .pipe(map((res) => res.article));
  }

  removeFromFavorite(slug: string) {
    return this.http
      .delete<ArticleResponse>(
        `${environment.API_BASE_URL}/articles/${slug}/favorite`
      )
      .pipe(map((res) => res.article));
  }
}

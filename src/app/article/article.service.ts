import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArticleResponse } from './types';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string) {
    return this.http
      .get<ArticleResponse>(`${environment.API_BASE_URL}/articles/${slug}`)
      .pipe(map((res) => res.article));
  }

  deleteArticle(slug: string) {
    return this.http.delete(`${environment.API_BASE_URL}/articles/${slug}`);
  }
}

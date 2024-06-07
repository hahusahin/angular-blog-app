import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { ArticleBody, OptionalArticleBody } from './types';
import { ArticleResponse } from '../article/types';

@Injectable({ providedIn: 'root' })
export class ModifyArticleService {
  constructor(private http: HttpClient) {}

  createArticle(article: ArticleBody) {
    return this.http
      .post<ArticleResponse>(`${environment.API_BASE_URL}/articles`, {
        article,
      })
      .pipe(map((res) => res.article));
  }

  updateArticle(article: OptionalArticleBody, slug: string) {
    return this.http
      .put<ArticleResponse>(`${environment.API_BASE_URL}/articles/${slug}`, {
        article,
      })
      .pipe(map((res) => res.article));
  }
}

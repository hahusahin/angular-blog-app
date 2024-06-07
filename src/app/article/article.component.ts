import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from './store/reducers';
import { articleActions } from './store/actions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusWrapperComponent } from '../shared/components/status-wrapper/status-wrapper.component';
import { selectCurrentUser } from '../auth/store/reducers';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [CommonModule, StatusWrapperComponent, RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute) {}

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  isAuthor$ = combineLatest([
    this.store.select(selectCurrentUser),
    this.store.select(selectArticleData),
  ]).pipe(
    map(([currentUser, article]) => {
      return currentUser?.username === article?.author.username;
    })
  );

  data$ = combineLatest({
    article: this.store.select(selectArticleData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    isAuthor: this.isAuthor$,
  });

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  onArticleDelete() {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}

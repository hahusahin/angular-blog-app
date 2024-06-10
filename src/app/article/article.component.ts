import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, filter, map, take, tap } from 'rxjs';
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
import { ArticleService } from './article.service';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [CommonModule, StatusWrapperComponent, RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

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

  isFollowing: boolean = false;
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    this.subscriptions.add(
      this.store
        .select(selectArticleData)
        .subscribe((data) => (this.isFollowing = !!data?.author.following))
    );
  }

  onArticleDelete() {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }

  handleFollow(following: boolean, authorName: string) {
    if (following) {
      this.subscriptions.add(
        this.articleService.unFollowAuthor(authorName).subscribe()
      );
    } else {
      this.subscriptions.add(
        this.articleService.followAuthor(authorName).subscribe()
      );
    }
    this.isFollowing = !this.isFollowing;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

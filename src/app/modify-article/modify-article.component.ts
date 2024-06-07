import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendErrors } from '../shared/components/backendErrors/backend-errors.component';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, combineLatest, tap } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from './store/reducers';
import { selectArticleData } from '../article/store/reducers';
import { modifyArticleActions } from './store/actions';

@Component({
  selector: 'mc-modify-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrors],
  templateUrl: './modify-article.component.html',
  styleUrl: './modify-article.component.css',
})
export class ModifyArticleComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tagList: [''],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  articleSub: Subscription = Subscription.EMPTY;
  slug: string | undefined;

  onSubmit() {
    const formValues = this.form.getRawValue();
    if (this.slug) {
      this.store.dispatch(
        modifyArticleActions.updateArticle({
          article: { ...formValues, tagList: formValues.tagList.split(' ') },
          slug: this.slug,
        })
      );
    } else {
      this.store.dispatch(
        modifyArticleActions.createArticle({
          article: { ...formValues, tagList: formValues.tagList.split(' ') },
        })
      );
    }
  }

  ngOnInit(): void {
    this.articleSub = this.store
      .select(selectArticleData)
      .pipe(
        tap((article) => {
          this.slug = article?.slug;
          this.form.patchValue({
            title: article ? article.title : '',
            description: article ? article.description : '',
            body: article ? article.body : '',
            tagList: article ? article.tagList.join(' ') : '',
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
  }
}

import { BackendErrorsInterface } from '../shared/types';

export interface ArticleBody {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export type OptionalArticleBody = Partial<ArticleBody>;

export interface ModifyArticleState {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}

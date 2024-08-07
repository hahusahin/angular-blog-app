import { ProfileInterface } from '../profile/profile.types';

export interface ArticleEntity {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileInterface;
}

export interface ArticleResponse {
  article: ArticleEntity;
}

export interface ArticleState {
  isLoading: boolean;
  error: string | null;
  data: ArticleEntity | null;
}

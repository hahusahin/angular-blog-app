export interface Profile {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

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
  author: Profile;
}

export interface FeedResponse {
  articles: ArticleEntity[];
  articlesCount: number;
}

export interface FeedState {
  isLoading: boolean;
  error: string | null;
  data: FeedResponse | null;
}

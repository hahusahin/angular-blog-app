export interface BackendErrorsInterface {
  [key: string]: string[];
}

export interface CurrentUserInterface {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  token: string;
  imageUrl: string | null;
}

export type FeedTabs = 'global' | 'feed' | 'popularTag';

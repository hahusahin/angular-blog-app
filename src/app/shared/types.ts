export interface BackendErrorsInterface {
  [key: string]: string[];
}

export interface CurrentUserInterface {
  email: string;
  username: string;
  bio: string | null;
  token: string;
  image: string | null;
}

export type FeedTabs = 'global' | 'feed' | 'popularTag';

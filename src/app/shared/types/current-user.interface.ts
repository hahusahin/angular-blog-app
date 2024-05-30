export interface CurrentUserInterface {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  token: string;
  image: string | null;
}

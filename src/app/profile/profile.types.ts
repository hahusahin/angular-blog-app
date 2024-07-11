export interface ProfileInterface {
  id: number;
  username: string;
  bio: string;
  imageUrl: string;
  following: boolean;
}

export interface ProfileStateInterface {
  data: ProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}

export interface GetProfileResponseInterface {
  profile: ProfileInterface;
}

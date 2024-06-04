export interface PopularTagsResponse {
  tags: string[];
}

export interface PopularTagsState {
  isLoading: boolean;
  error: string | null;
  data: string[];
}

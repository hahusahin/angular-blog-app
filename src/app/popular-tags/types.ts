export interface PopularTagsResponse {
  tags: { id: number; name: string }[];
}

export interface PopularTagsState {
  isLoading: boolean;
  error: string | null;
  data: { id: number; name: string }[];
}

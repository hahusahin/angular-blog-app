import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PopularTagsResponse } from './types';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags() {
    return this.http
      .get<PopularTagsResponse>(environment.API_BASE_URL + '/tags')
      .pipe(map((res) => res.tags));
  }
}

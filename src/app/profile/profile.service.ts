import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetProfileResponseInterface, ProfileInterface } from './profile.types';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<ProfileInterface> {
    const url = `${environment.API_BASE_URL}/profiles/${slug}`;

    return this.http
      .get<GetProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }

  followUser(id: number): Observable<ProfileInterface> {
    const url = `${environment.API_BASE_URL}/profiles/${id}/follow`;
    return this.http
      .post<GetProfileResponseInterface>(url, {})
      .pipe(map((response) => response.profile));
  }

  unFollowUser(id: number): Observable<ProfileInterface> {
    const url = `${environment.API_BASE_URL}/profiles/${id}/follow`;
    return this.http
      .delete<GetProfileResponseInterface>(url, {})
      .pipe(map((response) => response.profile));
  }
}

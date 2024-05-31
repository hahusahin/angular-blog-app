import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { environment } from '../../../environments/environment';
import {
  AuthResponseInterface,
  LoginRequestInterface,
  RegisterRequestInterface,
} from '../types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(
    reqBody: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.API_BASE_URL + '/users';
    return this.http
      .post<AuthResponseInterface>(url, reqBody)
      .pipe(map((res) => res.user));
  }

  login(reqBody: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.API_BASE_URL + '/users/login';
    return this.http
      .post<AuthResponseInterface>(url, reqBody)
      .pipe(map((res) => res.user));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.API_BASE_URL + '/user';
    return this.http
      .get<AuthResponseInterface>(url)
      .pipe(map((res) => res.user));
  }
}

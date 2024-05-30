import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../types/auth-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(
    reqBody: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiBaseUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, reqBody)
      .pipe(map((res) => res.user));
  }
}

import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/login`, {
        email: user.email,
        password: user.password
      })
      .pipe(
        map(res => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('larchUser', JSON.stringify(res.token));
          }

          return user;
        })
      );
  }

  foo(): any {
    return this.http.get(`${environment.apiUrl}/products`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('larchUser');
  }
}

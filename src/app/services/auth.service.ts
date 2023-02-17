import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any;
  user: any;
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  registerUser(user) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/reg', user, {
      headers: headers,
    });
    // .pipe(map((res: any) => res.json()));
  }

  authUser(user) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/auth', user, {
      headers: headers,
    });
  }

  storeUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isAuthenticated() {
    console.log(this.token, 'this.token');
    // return this.jwtHelperService.isTokenExpired(localStorage.getItem('token'));
    return this.jwtHelperService.tokenGetter();
  }

  createPost(post) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/dashboard', post, {
      headers: headers,
    });
  }
}

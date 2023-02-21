import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any;
  user: any;
  API_URL = 'https://blog-api-lnc0.onrender.com';
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  registerUser(user) {
    return this.http.post(`${this.API_URL}/account/reg`, user);
  }

  authUser(user) {
    return this.http.post(`${this.API_URL}/account/auth`, user);
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
    return this.jwtHelperService.tokenGetter();
  }

  createPost(post) {
    return this.http.post(`${this.API_URL}/account/dashboard`, post);
  }

  getAllPosts(): Observable<any[]> {
    return this.http.get(this.API_URL).pipe(map((res: any) => res));
  }

  getPostById(id: any): Observable<any> {
    return this.http
      .get(`${this.API_URL}/post/${id}`)
      .pipe(map((res: any) => res));
  }

  deletePost(id) {
    return this.http
      .delete(`${this.API_URL}/post/${id}`)
      .pipe(map((res: any) => res));
  }

  updatePostById(id: any, post: any): Observable<any> {
    return this.http
      .patch(`${this.API_URL}/post/${id}`, post)
      .pipe(map((res: any) => res));
  }
}

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
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  registerUser(user) {
    return this.http.post('http://localhost:3000/account/reg', user);

  }

  authUser(user) {
    return this.http.post('http://localhost:3000/account/auth', user, );
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
    // console.log(this.token, 'this.token');
    return this.jwtHelperService.tokenGetter();
  }

  createPost(post) {
    return this.http.post('http://localhost:3000/account/dashboard', post);
  }

  getAllPosts():Observable<any[]> {
     return this.http.get('http://localhost:3000').pipe(map((res: any) => res));
  }

  getPostById(id: any):Observable<any> {
    return this.http.get(`http://localhost:3000/post/${id}`).pipe(map((res: any) => res));
  }

  deletePost(id) {
    return this.http.delete(`http://localhost:3000/post/${id}`).pipe(map((res: any) => res));
  }
}

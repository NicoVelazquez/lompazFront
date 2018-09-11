import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  tokenKey = 'token';
  idKey = 'id';

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(credentials: any): Promise<any> {
    return this.http.post<any>('http://localhost:9000/session', credentials).toPromise();
  }

  public isLoggedIn() {
    // return window.localStorage.getItem(this.tokenKey) !== null; TODO
    return true;
  }

  public isAdmin() {
    // ni idea (?) TODO
    return false;
  }

  public logOut() {
    this.removeToken();
    this.removeId();
    this.router.navigate(['/']);
  }

  public getToken() {
    return window.localStorage.getItem(this.tokenKey);
  }

  public setToken(token) {
    return window.localStorage.setItem(this.tokenKey, token);
  }

  public removeToken() {
    return window.localStorage.removeItem(this.tokenKey);
  }

  public setId(id) {
    return window.localStorage.setItem(this.idKey, id);
  }

  public getId() {
    // return window.localStorage.getItem(this.idKey);
    return 1;
  }

  public removeId() {
    return window.localStorage.removeItem(this.idKey);
  }
}

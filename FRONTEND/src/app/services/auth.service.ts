import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private commonUrl = 'http://localhost:3000/api/';
  public isLoggedin = false;
  public userData = null;

  constructor(private _http: HttpClient) {}

  //log in
  loginUser(data: any): Observable<any> {
    return this._http.post(`${this.commonUrl}user/login`, data);
  }

  // register
  registerUser(data: User): Observable<any> {
    return this._http.post(`${this.commonUrl}user/register`, data);
  }

  // profile
  profile(): Observable<any> {
    return this._http.get(`${this.commonUrl}user/profile`);
  }

  //logout
  logout(data: any): Observable<any> {
    return this._http.post(`${this.commonUrl}user/logout`, data);
  }
}

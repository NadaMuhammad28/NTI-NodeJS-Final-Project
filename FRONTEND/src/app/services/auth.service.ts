import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private articleCommonUrl = 'http://localhost:3000/api/article';
  private commonUrl = 'http://localhost:3000/api/';
  public isLoggedin = false;
  public userData:any = null;

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

  // profile image
  imgUpload(data:any):Observable<any>{
    return this._http.post("http://localhost:3000/api/user/uploadImage", data)
  }



  // blog
  // show all articles
  showAllArticles(): Observable<any> {
    return this._http.get(`${this.articleCommonUrl}/allAriticles`);
  }
  //show single article
  showSingleArticle(articleId: any): Observable<any> {
    return this._http.get(`${this.articleCommonUrl}/singleArticle/${articleId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _http: HttpClient) {}

  registerUser(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/user/register', data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _http: HttpClient) {}

  private productCommonUrl = 'http://localhost:3000/api/product';

  // all products
  getAllProducts(): Observable<any> {
    return this._http.get(`${this.productCommonUrl}/getAllProducts`);
  }
  //GET SINGLE PRODUCT
  getProduct(productId: any): Observable<any> {
    return this._http.get(`${this.productCommonUrl}/getProduct/${productId}`);
  }
}

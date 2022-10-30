import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}

  private CommonUrl = 'http://localhost:3000/api/';

  // all products
  addToCartbtn(productId: any): Observable<any> {
    let b = {
      quantity: 5,
    };
    const body = JSON.stringify(b);
    console.log(body);
    return this._http.post(
      `${this.CommonUrl}cart/addToCart/${productId}`,
      body
    );
  }
  ////////////////////////////////////////////////////////////////////////

  getCartItems(): Observable<any> {
    return this._http.get(`${this.CommonUrl}cart/getCartItems`);
  }
}

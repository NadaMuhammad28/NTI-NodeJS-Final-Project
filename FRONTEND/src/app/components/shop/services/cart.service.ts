import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient, private _router: Router) {}

  private CommonUrl = 'http://localhost:3000/api/';

  // all products
  addToCartbtn(productId: any): Observable<any> {
    let body = {
      quantity: 1,
    };

    return this._http.post(
      `${this.CommonUrl}cart/addToCart/${productId}`,
      body
    );
  }
  getCartItems(): Observable<any> {
    return this._http.get(`${this.CommonUrl}cart/getCartItems`);
  }
  ////////////////////////////////////////////////////////////////////////
  addToCart(productId: any, q: any): Observable<any> {
    let body = {
      quantity: q,
    };
    console.log(`from server ${q}`);

    return this._http.post(
      `${this.CommonUrl}cart/addToCart/${productId}`,
      body
    );
  }

  removeProduct(productId: any): Observable<any> {
    return this._http.delete(
      `${this.CommonUrl}cart/removeProduct/${productId}`
    );
    // this._router.navigateByUrl('cart');
  }

  emptyCart(): Observable<any> {
    return this._http.delete(`${this.CommonUrl}cart/emptyCart`);
  }
}

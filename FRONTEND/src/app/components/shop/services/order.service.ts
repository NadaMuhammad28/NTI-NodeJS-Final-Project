import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _cartServer: CartService
  ) {}

  private CommonUrl = 'http://localhost:3000/api/';

  addOrder(order: any): Observable<any> {
    return this._http.post(`${this.CommonUrl}order/add`, order);
  }
}

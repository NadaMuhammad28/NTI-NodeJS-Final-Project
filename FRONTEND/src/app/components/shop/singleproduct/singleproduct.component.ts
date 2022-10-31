import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

import { DataService } from '../services/data.service';
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css'],
})
export class SingleproductComponent implements OnInit {
  productId: any;
  isLoaded: boolean = false;
  result: any = {};
  imgURL = 'http://localhost:3000/';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _data: DataService,
    private _cartServer: CartService,
    private _router: Router
  ) {
    // this.productId = this._activatedRoute.snapshot.paramMap.get('productId');
    this.productId = this._activatedRoute.snapshot.params['productId'];
  }

  ngOnInit(): void {
    this.getSingleProduct();
  }

  getSingleProduct() {
    this._data.getProduct(this.productId).subscribe(
      (res) => {
        this.result = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isLoaded = true;
      }
    );
  }

  getQuantity(quantity: any) {
    return quantity;
  }

  addToCart(p: any, q: any) {
    // quantity = this.getQuantity;

    this._cartServer.addToCart(p, q).subscribe(
      (res) => {},
      (e) => {
        console.log(e);
      },
      () => {
        this._router.navigate(['cart']).then(() => {
          window.location.reload();
        });
      }
    );

    console.log(p);
  }
}

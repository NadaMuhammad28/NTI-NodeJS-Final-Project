import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any;
  imgURL = 'http://localhost:3000/';
  isLoaded: boolean = false;
  result: any;
  products: any[] = [];
  totalPrice: number = 0;
  totalAmount: number = 0;
  isCart = false;

  constructor(
    private _cartServer: CartService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }
  get price(): any {
    return this.totalPrice;
  }

  getCartItems() {
    this._cartServer.getCartItems().subscribe(
      (res) => {
        [this.cartData] = res.data;
        console.log(this.cartData);

        this.result = this.cartData.cartItems;
        this.result.forEach((it: { quantity: any; productId: any }) => {
          it.productId.quantity = it.quantity;
          this.products.push(it.productId);
        });
        //total price
        this.totalPrice = this.products
          .map((p) => p.price * p.quantity)
          .reduce((a, b) => a + b);
        //total amount
        this.totalAmount = this.products
          .map((p) => p.quantity)
          .reduce((a, b) => +a + b);
      },
      (e) => {
        console.log(e);
        // redirect the user to login page if they press the btn whey they're not authorized
      },
      () => {
        if (this.products.length != 0) {
          this.isCart = true;
        }
        this.isLoaded = true;
      }
    );
  }

  deleteProduct(productId: any) {
    this._cartServer.removeProduct(productId).subscribe(
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
  }

  //EMPTY THE CART
  emptyCart() {
    this._cartServer.emptyCart().subscribe(
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
  }

  navigatetoorder() {
    this._router.navigate(['check-out'], {
      queryParams: { price: this.totalPrice, amount: this.totalAmount },
    });
  }
}

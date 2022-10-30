import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any;
  isCart = false;

  constructor(
    private _cartServer: CartService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this._cartServer.getCartItems().subscribe(
      (res) => {
        console.log(res);
      },
      (e) => {
        console.log(e);
      },
      () => {
        this.isCart = true;
      }
    );
  }
}

//   constructor(public cartService: CartService) {
//   }

//   ngOnInit() {
//      this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
//      this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
//   }

//   ChangeQuantity(id: Number, increaseQuantity: Boolean) {
//     this.cartService.UpdateCartData(id, increaseQuantity);
//   }

// }

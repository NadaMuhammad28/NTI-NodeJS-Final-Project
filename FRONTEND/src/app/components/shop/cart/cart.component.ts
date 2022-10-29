import { Component, OnInit } from '@angular/core';
// import {CartService} from "../../services/cart.service";
// import {Observable} from "rxjs";
// import {CartModelServer} from "../../models/cart.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // cartData: CartModelServer;
  cartData: any;
  // cartTotal: Number;
  // subTotal: Number;
  constructor() {}

  ngOnInit(): void {}
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderComponent } from '../order/order.component';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
})
export class ThankyouComponent implements OnInit {
  orderID: any;
  price: any;
  quantity: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.orderID = params['order'];
      this.price = params['price'];
      this.quantity = params['amount'];

      console.log(`from ty ${this.orderID}`);
    });
  }
}

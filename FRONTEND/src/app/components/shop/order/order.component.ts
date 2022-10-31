import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { CartComponent } from '../cart/cart.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderForm = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    governate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    floorNumber: new FormControl('', [Validators.required]),
    flatNumber: new FormControl('', [Validators.required]),
  });
  orderId: any;
  totalPrice: any;
  totalAmount: any;
  constructor(
    private route: ActivatedRoute,
    private _cartServer: CartService,
    private _orderServer: OrderService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.totalPrice = params['price'];
      this.totalAmount = params['amount'];
    });
  }
  get phone() {
    return this.orderForm.get('phone');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get floorNumber() {
    return this.orderForm.get('floorNumber');
  }

  get flatNumber() {
    return this.orderForm.get('flatNumber');
  }

  get governate() {
    return this.orderForm.get('governate');
  }

  handleOrder() {
    if (this.orderForm.valid) {
      let data: any = this.orderForm.value;

      console.log(data);

      this._orderServer.addOrder(data).subscribe(
        (res) => {
          console.log(res);
          this.orderId = res.data._id;
          console.log(this.orderId);
        },
        (err) => {
          console.log(err);
          // this.msg = err.error.message;
          // this.orderForm.reset();
        },
        () => {
          this._router.navigate(['order-confirmation'], {
            queryParams: {
              order: this.orderId,
              price: this.totalPrice,
              amount: this.totalAmount,
            },
          });
          //this._router.navigateByUrl('/sign-in');
        }
      );
    }
  }

  getOrderId() {
    return this.orderId;
  }
}

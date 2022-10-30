import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Product } from 'src/app/interfaces/product';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //use interface here
  result: Product[] = [];
  isLoaded: boolean = false;
  cartproducts: Product[] = [];
  imgURL = 'http://localhost:3000/';
  constructor(
    private _data: DataService,
    private _cartServer: CartService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this._data.getAllProducts().subscribe(
      (res) => {
        this.result = res.data;
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        this.isLoaded = true;
      }
    );
  }

  addToCartbtn(p: any) {
    this._cartServer.addToCartbtn(p).subscribe(
      (res) => {
        console.log(res);
      },
      (e) => {
        console.log(e);
      },
      () => {}
    );

    console.log(p);
  }
}
/*
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //use interface here
  result: any[] = [];
  imgURL = 'http://localhost:3000/';
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this._data.getAllProducts().subscribe(
      (res) => {
        this.result = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Product } from 'src/app/interfaces/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //use interface here
  result: Product[] = [];
  cartproducts: Product[] = [];
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
        console.log(err.message);
      },
      () => {}
    );
  }
  addToCart(p: Product) {
    // console.log(p);
    if ('cart' in localStorage) {
      this.cartproducts = JSON.parse(localStorage.getItem('cart')!);

      this.cartproducts.push(p);
      localStorage.setItem('cart', JSON.stringify(this.cartproducts));
    } else {
      this.cartproducts.push(p);
      localStorage.setItem('cart', JSON.stringify(this.cartproducts));
    }
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data.service';
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css'],
})
export class SingleproductComponent implements OnInit {
  productId: any;
  result: any = {};
  imgURL = 'http://localhost:3000/';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _data: DataService
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
      () => {}
    );
  }
}

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

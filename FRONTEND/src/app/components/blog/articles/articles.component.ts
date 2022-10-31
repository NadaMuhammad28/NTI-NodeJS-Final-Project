import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  isLoaded: boolean = false;
  cartproducts: Article[] = [];
  imgURL = 'http://localhost:3000/';

  constructor(private _auth: AuthService, private _activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.showArticles();
  }
  showArticles() {
    this._auth.showAllArticles().subscribe(
      (res) => {
        this.articles = res.data;
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        this.isLoaded = true;
      }
    );
  }
}

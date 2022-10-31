import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  articleId: any;
  articles: any = {};
  imgURL = 'http://localhost:3000/';

  constructor(private _auth : AuthService, private _activatedRoute: ActivatedRoute) {
    this.articleId = this._activatedRoute.snapshot.params['articleId'];
   }


   ngOnInit(): void {
    this.showSingleArticle();
  }

  showSingleArticle() {
    this._auth.showSingleArticle(this.articleId).subscribe(
      (res) => {
        this.articles = res.data.article;
        console.log(this.articles)
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
}

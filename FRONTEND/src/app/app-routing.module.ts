import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { SingleproductComponent } from './components/shop/singleproduct/singleproduct.component';
import { Error404Component } from './components/pages/error404/error404.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { OrderComponent } from './components/shop/order/order.component';
import { IsloggedGuard } from './guards/islogged.guard';
import { IsauthGuard } from './guards/isauth.guard';
import { ThankyouComponent } from './components/shop/thankyou/thankyou.component';
import { ConfirmorderGuard } from './guards/confirmorder.guard';
import { ArticlesComponent } from './components/blog/articles/articles.component';
import { SingleArticleComponent } from './components/blog/single-article/single-article.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [IsauthGuard] },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: ':productId', component: SingleproductComponent },
    ],
  },
  {
    path: 'articles',
    children: [
      { path: '', component: ArticlesComponent },
      { path: ':articleId', component: SingleArticleComponent },
    ],
  },
  {
    path: 'check-out',
    component: OrderComponent,
  },
  { path: 'sign-in', component: LoginComponent, canActivate: [IsloggedGuard] },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'order-confirmation', component: ThankyouComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

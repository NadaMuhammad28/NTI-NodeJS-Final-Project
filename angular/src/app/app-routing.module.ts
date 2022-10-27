import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { SingleproductComponent } from './components/shop/singleproduct/singleproduct.component';
import { Error404Component } from './components/pages/error404/error404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: ':id', component: SingleproductComponent },
    ],
  },
  { path: 'sign-in', component: LoginComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

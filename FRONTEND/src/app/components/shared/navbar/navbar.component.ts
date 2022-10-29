import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _auth:AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.profile()
  }

  profile(){
    this._auth.profile().subscribe(
      res => {
        console.log(res)
        this._auth.isLoggedin = true
        this._auth.userData = res.data
      },
      err => {
        console.log(err.error.message)
        this._auth.isLoggedin = false
        this._auth.userData = null
      },
      () => {console.log("done")}
    )
  }

  logout(){
    const data = null
    this._auth.logout(data).subscribe(
      res =>{
        console.log(res)
        this._auth.isLoggedin = false
        this._auth.userData = null
        localStorage.removeItem("token")
      },
      err => {
        console.log(err.error.message)
      },
      () => {
        console.log("logout done")
        this._router.navigateByUrl("/")
      }
    )

  }
}

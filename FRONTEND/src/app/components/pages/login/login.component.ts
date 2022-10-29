import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  msg = '';
  //isSubmitted = false

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  handleLogin() {
    //this.isSubmitted = true

    if (this.loginForm.valid) {
      this._auth.loginUser(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          this._auth.isLoggedin = true;
          this._auth.userData = res.data.userData;
        },
        (err) => {
          console.log(err);
          this.msg = err.error.message;
          this._auth.isLoggedin = false;
          this._auth.userData = null;
          this.loginForm.reset();
        },
        () => {
          console.log('done');
          this._router.navigateByUrl('/profile');
        }
      );
    }
  }
}

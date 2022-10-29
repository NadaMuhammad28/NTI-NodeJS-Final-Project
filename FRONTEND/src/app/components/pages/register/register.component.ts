import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  msg = '';
  //isSubmitted = false

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
  });
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  get name() {
    return this.registerForm.get('name');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get email() {
    return this.registerForm.get('email');
  }

  handleRegister() {
    //this.isSubmitted = true

    if (this.registerForm.valid) {
      let data: User | any = this.registerForm.value;
      this._auth.registerUser(data).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.msg = err.error.message;
          this.registerForm.reset();
        },
        () => {
          console.log('done');
          this._router.navigateByUrl('/sign-in');
        }
      );
    }
  }
}

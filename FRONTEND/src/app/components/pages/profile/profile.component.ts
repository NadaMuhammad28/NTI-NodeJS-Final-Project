import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    //this.profile()
  }

  profile(){
    this._auth.profile().subscribe(
      res => {console.log(res)},
      err => {console.log(err.error.message)},
      () => {console.log("done")}
    )
  }

}

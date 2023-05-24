import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}

constructor(private auth:AuthenticateService, private router:Router, public userservice:UserService){}


pageLoad:boolean = true;

public checkLogin(){
  return this.auth.isLoggedIn();
}

public logout(){
   this.auth.clearData();
   console.log(localStorage.getItem('role'));
   this.router.navigateByUrl("/");
}

toCart(){
  this.pageLoad=false;
  this.router.navigateByUrl("/cart");
}

}



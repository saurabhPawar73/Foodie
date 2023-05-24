import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouteReuseStrategy, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private authenticate:AuthenticateService) { }
  ngOnInit(): void {
  }


  responseData: any;

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
        console.log(response.token);
        console.log(response.message);
        console.log(response.role);
        this.authenticate.setToken(response.token);
        this.authenticate.setRole(response.role);
        const role=response.role;
        if(role=='admin'){
          alert('Welcome Admin')
          this.router.navigateByUrl("/admin");
        }else{
          alert('login success');
          this.router.navigateByUrl("/");
        }
      }
    );
  }
    // return this.userService.login(loginForm.value).subscribe(
    //   (response:any) => {
    //     console.log(response);
    //     this.responseData = response;
    //     console.log(this.responseData.message);
    //     //console.log(this.responseData.role);
    //     console.log(this.responseData.token);

    //     //saving in browser storage using below code
    //     localStorage.setItem("jwt", this.responseData.token);
    //     localStorage.setItem("role", this.responseData.role);

        
    //     if(this.responseData.role=='admin'){
    //       alert("Welcome Admin")
    //       this.router.navigateByUrl("/admin");
    //     }
    //     else{
    //     alert("Login success");
    //     this.router.navigateByUrl("/user");}

    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  

}

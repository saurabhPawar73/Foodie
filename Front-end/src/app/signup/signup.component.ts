import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  ngOnInit(): void {}

  constructor(private userService:UserService, private router:Router){}


  // signupForm=new FormGroup({
  //   'emailId': new FormControl(),
  //   'firstName':new FormControl(),
  //   'lastName':new FormControl(),
  //   'address':new FormControl(),
  //   'password':new FormControl()
  // });

  signup(signUpForm:NgForm){
    this.userService.register(signUpForm.value).subscribe(
      (response) => {
        console.log(response);
        alert("Account Created Successfully!!")
        this.router.navigateByUrl("/login");
      }
    )
  }

}

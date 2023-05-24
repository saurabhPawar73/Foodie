import { publishFacade } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  public setRole(role:string){
    localStorage.setItem('role', role);
  }

  public getRoles():any{
    return localStorage.getItem('role');
  }

  public setToken(token:string){
    localStorage.setItem('token', token);
  }

  public getToken():any{
    return localStorage.getItem('token');
  }

  public clearData(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

 
  public adminLoggedIn():boolean{
 const role=localStorage.getItem('role');
      if(role==='admin'){
        console.log(role);
        return true;
      }else{
        return false;
      }
    }
  public userLoggedIn():boolean{
      const role=localStorage.getItem('role');
      if(role==='user'){
        console.log(role);
        return true;
      }else{
        return false;
      }
  }

  }




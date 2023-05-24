import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ForuserGuard implements CanActivate {
  constructor(private auth:AuthenticateService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.auth.userLoggedIn()){
     return true;
    }else{
      alert('only logged in users can access this page');
      this.router.navigateByUrl('/forbidden');
      return false;
    }
  }
  
}

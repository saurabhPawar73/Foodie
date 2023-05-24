import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Dish } from '../model/dish.model';
import { UserService } from './user.service';
import { ImageProcessingService } from './image-processing.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderDishResolverService implements Resolve<Dish[]>{

  constructor(private service:UserService, private imgService:ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dish[]> {
  
    const isSingleDishCheckout= route.paramMap.get("isSingleDishCheckout")
    const id=route.paramMap.get("id");
    
    
      return this.service.getDishDetails(isSingleDishCheckout,id)
      .pipe(
        map(
          (x:Dish[], i) => x.map((dish:Dish) => this.imgService.generateImage(dish))
        )
      )
    
  }
}

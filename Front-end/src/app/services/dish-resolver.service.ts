import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Dish } from '../model/dish.model';
import { Observable, map, of } from 'rxjs';
import { UserService } from './user.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class DishResolverService implements Resolve<Dish> {

  constructor(private service:UserService, private imgService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dish> {
    
    const id=route.paramMap.get("dishId");

    if(id){
     return this.service.getDishDetailsById(id)
     .pipe(
      map(p=> this.imgService.generateImage(p))
     );
    }else{
        return of(this.getDishDetails());
    }
  }

  getDishDetails(){
    return {
      
        dishId:0,
        dishName: "",
        dishPrice:0,
        dishDescription: "",
        vendor:"",
        dishImages: []
      }
    }
  }


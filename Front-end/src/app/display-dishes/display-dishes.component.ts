import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Dish } from '../model/dish.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-dishes',
  templateUrl: './display-dishes.component.html',
  styleUrls: ['./display-dishes.component.css']
})
export class DisplayDishesComponent implements OnInit {

  constructor(private service:UserService, private imgservice:ImageProcessingService, private router:Router){}
  ngOnInit(): void {
    this.displayAllDishes();
  }

  dishDetails: Dish[]=[];
  displayedColumns: string[] = ['ID', 'Dish Name', 'Dish Price', 'Vendor', 'Edit', 'Delete'];
  pageNumber:number= 0;    
  showTable:boolean = false;
 showLoadMoreButton:boolean = false

  public displayAllDishes(){
    this.showTable=false;
    this.service.getAllDishes(this.pageNumber)
    
    .subscribe(
      (response:Dish[])=>
      {
        console.log(response);
        response.forEach(dish => this.dishDetails.push(dish));
        this.showTable=true;
        if(response.length!=0){
          this.showLoadMoreButton=true;
        }else{
          this.showLoadMoreButton=false;
        }
      }
    )
  }

  loadMoreDishes(){
this.pageNumber=this.pageNumber+1;
this.displayAllDishes();
  }

  deleteDish(dishId:any){
this.service.removeDish(dishId).subscribe(
  (resposne)=>{
    this.displayAllDishes();
  }
)
this.displayAllDishes();

  }


  editDishDetails(dishId:any){
    this.router.navigate(['/addDish', {dishId:dishId}])
  }

}

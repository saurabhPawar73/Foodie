import { Component, OnInit } from '@angular/core';
import { ImageProcessingService } from '../services/image-processing.service';
import { publishFacade } from '@angular/compiler';
import { UserService } from '../services/user.service';
import { Dish } from '../model/dish.model';
import { FileHandle } from '../model/fileHandle.model';
import { map } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

dishDetails:Dish[]=[];
isSingleDishCheckout:Boolean=false;
showLoadButton:boolean=false;
pageNumber:number=0;



ngOnInit():void {
  this.displayAllDishes();

}

constructor(private service:UserService ,private imgService:ImageProcessingService,
   private authenticateService:AuthenticateService, private router:Router){}


   searchByKey(searchWord:any){
    this.pageNumber=0;
    this.dishDetails = [];
    this.displayAllDishes(searchWord);
}

public displayAllDishes(searchKey:string = "")
  {
     this.service.getAllDishes(this.pageNumber, searchKey)
    .pipe(
      map((x:Dish[], i )=> x.map((dish:Dish)=> this.imgService.generateImage(dish)))
    )
    .subscribe(
      (response:Dish[])=>{
        console.log(response);
        if(response.length == 12){
     this.showLoadButton = true;
        }else{
          this.showLoadButton=false;
        }
          response.forEach(d => this.dishDetails.push(d));
          this.dishDetails=response;
      }
    )
  }

  loadMoreDishes(){
    this.pageNumber=this.pageNumber+1;
    this.displayAllDishes();
  }

  viewDetails(dishId:any){
  const role=  localStorage.getItem('role');
  if(role==='user'){
  
    this.router.navigate(['/viewDishDetails', {dishId:dishId}
  ]);
  
  }else{
    
      this.router.navigateByUrl('/forbidden');
      alert('Kindly login first to order');
      this.router.navigateByUrl('/login');
  }
    }

 

}







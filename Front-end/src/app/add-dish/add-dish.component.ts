import { Component, OnInit } from '@angular/core';
import { Dish } from '../model/dish.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/fileHandle.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  
constructor(private userService:UserService, private domSanitizer:DomSanitizer, private actRoute:ActivatedRoute){}

dish:Dish={
  dishId:0,
  dishName: "",
  dishPrice:0,
  dishDescription:"",
  vendor:"",
  dishImages: []
}

isNewDish = true;

ngOnInit(): void {
 this.dish = this.actRoute.snapshot.data['dish'];

 if(this.dish && this.dish.dishId){
  this.isNewDish=false;
 }
}




addDish(addDishForm:NgForm){
   const dishFormData =this.makeFormData(this.dish);
  return this.userService.sendDishData(dishFormData).subscribe(
    (response)=>{
      console.log(response);
      alert("Dish added")
      addDishForm.reset();
    }
  );
}

 
makeFormData(dish:Dish):FormData{
  const formData=new FormData();

  formData.append(
    'dish', new Blob([JSON.stringify(dish)], {type:'application/json'})
  );

for(var i=0; i < dish.dishImages.length; i++){
  formData.append(
    'image', 
    dish.dishImages[i].file,
    dish.dishImages[i].file.name
  );
}
return formData;

}


clearForm(addDishForm:NgForm){
  addDishForm.reset();
}

onFileSelect(event:any){
  if(event.target.files){
    const fileObj =event.target.files[0];

    const fileHandle1:FileHandle={
      file:fileObj,
      url:this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileObj))
    }
    this.dish.dishImages.push(fileHandle1); 
  }
}

removeImg(i:number){
this.dish.dishImages.splice(i, 1);
}

}

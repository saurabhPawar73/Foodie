import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string [] = [ 'Name', 'Dish Price', 'Vendor', 'Action'];

  cartDetails: any[]= [];

  emptyCartMsg:boolean = false;

  constructor(private service:UserService, private router:Router){
  }
  ngOnInit(): void {
   this.getCartItems();
  }

  public getCartItems(){
  this.service.getCartDetails().subscribe(
  (response: any) => {
      this.cartDetails=response;
      if(this.cartDetails.length===0){
        this.emptyCartMsg=true;
      }
  }
)
  }

  removeItem(cartId:any){
    this.service.removeCartItem(cartId).subscribe(
      (response) => {
        console.log(response);
        this.getCartItems();
      }
    )
  }
   
  public checkout(){
    this.router.navigate(['/orderDish', {
      isSingleDishCheckout: false, id: 0
    }])
  }

}

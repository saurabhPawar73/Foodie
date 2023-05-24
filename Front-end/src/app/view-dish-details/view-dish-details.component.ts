import { Component, OnInit } from '@angular/core';
import { Dish } from '../model/dish.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { R3SelectorScopeMode } from '@angular/compiler';

@Component({
  selector: 'app-view-dish-details',
  templateUrl: './view-dish-details.component.html',
  styleUrls: ['./view-dish-details.component.css']
})
export class ViewDishDetailsComponent implements OnInit {

  dish: Dish = {
    dishId: 0,
    dishName: "",
    dishPrice: 0,
    dishDescription: "",
    vendor: "",
    dishImages: []
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: UserService) { }
  ngOnInit(): void {
    this.dish = this.activatedRoute.snapshot.data['dish'];

    console.log(this.dish);
  }


  orderDish(dishId: any) {
    this.router.navigate(['/orderDish', {
      isSingleDishCheckout: true, id: dishId
    }])
  }

  addToCart(dish: Dish) {
  this.service.addItemToCart(dish).subscribe(
  (response) => {
    console.log(response);
    alert("Item added to cart successfully");
  }
);
  }


}

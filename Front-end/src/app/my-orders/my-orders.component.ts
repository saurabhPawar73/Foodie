import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns:string[] = ['Order ID','Orderer', 'Address', 'Contact Number', 'Status', 'Amount', 'Dish'];

  myOrders: Order[] = [];

  ngOnInit(): void {
    this.getMyOrders()
  }
  constructor(private service:UserService){}

getMyOrders(){
  this.service.getUserOrders().subscribe(
    (response:Order[])=>{
      console.log(response);
      this.myOrders=response;
    }
  )
}

}

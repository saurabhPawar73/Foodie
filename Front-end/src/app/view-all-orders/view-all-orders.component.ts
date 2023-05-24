import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css']
})
export class ViewAllOrdersComponent implements OnInit {
  
  displayedColumns:string[] = ['Order ID','Orderer', 'Address', 'Contact Number', 'Status', 'Amount', 'Dish', 'Action'];

  status:string = 'all';

  ngOnInit(): void {
  this.getAllOrders(this.status);

  }

  orders: Order[] =[];
  constructor(private service:UserService){}

  getAllOrders(statusParam:string){
    this.service.getAllOrders(statusParam).subscribe(
    (response) => {
      console.log(response);
      this.orders=response;
    }
    )
  }

  markAsDelivered(id:any){
    this.service.changeStatus(id).subscribe(
      (response) =>{
        console.log(response);
        this.getAllOrders(this.status);
      }    
      );

  }
}

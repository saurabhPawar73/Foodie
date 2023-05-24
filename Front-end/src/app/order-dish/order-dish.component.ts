import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../model/order-details.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Dish } from '../model/dish.model';
import { ActivatedRoute, Router } from '@angular/router';
import customers from 'razorpay/dist/types/customers';

declare var Razorpay:any

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.component.html',
  styleUrls: ['./order-dish.component.css']
})
export class OrderDishComponent implements OnInit {

  constructor(private service: UserService, private activateRoute: ActivatedRoute, private route: ActivatedRoute, private router: Router) { }

  isSingleDishCheckout: any = "";

  dishDetails: Dish[] = [];



  dish: Dish = {
    dishId: 0,
    dishName: "",
    dishPrice: 0,
    dishDescription: "",
    vendor: "",
    dishImages: []
  }

  orderDetails: OrderDetails = {
    fullName: '',
    address: '',
    contactNo: '',
    transactionId: '',
    orderDishQuantityList: []
  }

  ngOnInit(): void {
    this.dishDetails = this.activateRoute.snapshot.data['dishDetails'];

    this.isSingleDishCheckout = this.activateRoute.snapshot.paramMap.get("isSingleDishCheckout");

    this.dishDetails.forEach(
      x => this.orderDetails.orderDishQuantityList.push(
        { dishId: x.dishId, quantity: 1 }
      )
    );

    console.log(this.orderDetails);

  }

  placeOrder(orderDishForm: NgForm) {
    this.service.placeOrder(this.orderDetails, this.isSingleDishCheckout).subscribe(
      (response) => {
        console.log(response);
        orderDishForm.reset();
        this.router.navigateByUrl("/orderConfirmed");

      });
  }

  getQtyOfDish(dishId: any) {
    const filteredDish = this.orderDetails.orderDishQuantityList.filter(
      (dishQTy) => dishQTy.dishId === dishId
    );
    return filteredDish[0].quantity;
  }

  onQuantityChange(qty: any, dishId: any) {
    this.orderDetails.orderDishQuantityList.filter(
      (orderDish) => orderDish.dishId === dishId)[0].quantity = qty;
  }

  getTotalAmount(dishId: any, dishPrice: any) {
    const filteredDish = this.orderDetails.orderDishQuantityList.filter(
      (dishQuantity) => dishQuantity.dishId === dishId
    )
    return filteredDish[0].quantity * dishPrice;
  }

  getGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderDishQuantityList.forEach(
      (dishQty) => {
        const amount = this.dishDetails.filter(dish => dish.dishId === dishQty.dishId)[0].dishPrice;
        grandTotal = grandTotal + amount * dishQty.quantity;
      }
    );
    return grandTotal;
  }

  createTransactionAndpPlaceOrder(orderForm: NgForm) {
    let amount = this.getGrandTotal();
    this.service.createTransaction(amount).subscribe(
      (response) => {
        console.log(response);
        this.openTransactionModal(response, orderForm);
      }
    );
  }

  openTransactionModal(response: any, orderForm:NgForm) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Foodie',
      description: ' Payment of online food delivery',
      image: 'https://cdn.dribbble.com/users/4987860/screenshots/15665665/foodie.jpg',
      handler: (response: any) => {
        if(response!=null && response.razorpay_payment_id !=null){
        console.log(response);
        this.orderDetails.transactionId=response.razorpay_payment_id;
        this.placeOrder(orderForm);
      }else{
        alert('Payment failed!')
      }
      },
      prefil: {
        name: 'Foodie',
        email: 'pawarsaurabh7399@gmail.com',
        contact: '9075662281'
      },
      notes: {
        address: 'Online Food Delivery'
      },
      theme: {
        color: '#F37254'
      }}
      var razorpayObj=new Razorpay(options);
      razorpayObj.open();
    }
  // processResponse(response:any){
  //   console.log(response)
  // }
}
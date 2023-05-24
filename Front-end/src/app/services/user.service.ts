import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { Dish } from '../model/dish.model';
import { OrderDetails } from '../model/order-details.model';
import { Order } from '../model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient, private auth:AuthenticateService) { }

  beBaseUrl="http://localhost:7777";

 
  login(formData:any){
    return this.httpClient.post(this.beBaseUrl+"/login", formData);
  }

  register(signupData:any){
    return this.httpClient.post(this.beBaseUrl+"/create-user", signupData);
  }

  public matchRole(currentRole:any):boolean{
    let match=false;
     const role=this.auth.getRoles();
     if(role==currentRole){
      match=true;
      return match;
     }
     return match;
    }

public sendDishData(dish:FormData){
  return this.httpClient.post<Dish>(this.beBaseUrl+("/addDish"), dish);
}
public getAllDishes(pageNumber:any, searchKey:string=""){
  return this.httpClient.get<Dish[]>(this.beBaseUrl+("/dish/get/all?pageNo="+pageNumber+"&searchKey="+searchKey));
}

public removeDish(dishId:number){
   return this.httpClient.delete(this.beBaseUrl+"/dish/delete/"+dishId)
}

public getDishDetails(isSingleDishCheckout:any, dishId:any){
  let httpHeaders=new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem('token')
  });
  let request={headers:httpHeaders};
return this.httpClient.get<Dish[]>(this.beBaseUrl+("/getDishDetails/"+isSingleDishCheckout+"/"+dishId), request);
}

public removeCartItem(cartId:any){
  return this.httpClient.delete(this.beBaseUrl+"/delete-cart-item/"+cartId);
}

public placeOrder(orderDetails:OrderDetails, isSingleDishCheckout:any){
  let httpHeaders=new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem('token')
  });
  let request={headers:httpHeaders};

  return this.httpClient.post(this.beBaseUrl+"/place-order/"+isSingleDishCheckout, orderDetails, request);
}

public addItemToCart(dish:Dish){
  let httpHeaders=new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem('token')
  });
  let request={headers:httpHeaders};

  return this.httpClient.post(this.beBaseUrl+"/add-to-cart", dish, request);
}

public getCartDetails(){
  let httpHeaders=new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem('token')
  });
  
  let request={headers:httpHeaders};
  return this.httpClient.get(this.beBaseUrl+"/get-cart-items", request);
}

public getDishDetailsById(dishId:any){
  return this.httpClient.get<Dish>(this.beBaseUrl+"/getDishDetailsById/"+dishId);
}

public getUserOrders(): Observable<Order[]>{
 
  let httpHeaders=new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem('token')
  });
  let request={headers:httpHeaders};
  
  return this.httpClient.get<Order[]>(this.beBaseUrl+"/get-orders", request)
}

public getAllOrders(status:string): Observable<Order[]>{
  
  let httpHeaders=new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem('token')
  });
  let request={headers:httpHeaders};
  return this.httpClient.get<Order[]>(this.beBaseUrl+"/get-all-orders/"+status, request);
}

public changeStatus(orderId:any){
    return this.httpClient.get(this.beBaseUrl+("/change-status/"+orderId));
}

public createTransaction(amount:any){
  return this.httpClient.get(this.beBaseUrl+("/create-transaction/"+amount));
}
}

import { Dish } from "./dish.model";

export interface Order
{
    orderId:number,
    ordererFullName:string,
    orderFullAddress:string,
    ordererContactNo:string,
    orderStatus:string,
    orderTotalAmount:number,
    dish:Dish,
    user:any
}
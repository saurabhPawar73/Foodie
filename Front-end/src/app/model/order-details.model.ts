import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails{
    fullName: string;
    address: string;
    contactNo:string;
    transactionId: string;
    orderDishQuantityList:OrderQuantity[];
}
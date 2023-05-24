import { FileHandle } from "./fileHandle.model";

export interface Dish{
    dishId:number;
 dishName:string;
 dishPrice:number;
 dishDescription:string;
 vendor:string;
 dishImages: FileHandle[];
}
import mongoose from "mongoose";

export interface EcomProduct{
    sub_category_Id: mongoose.Types.ObjectId | undefined | any,
    product_name:string,
    product_description : string, 
    product_logo: string,
    product_images: []
    product_price: string,
    product_brand: string,
    product_quantity:number,
    isActive : boolean,
    createdAt? : Date,
    updatedAt? : Date
}
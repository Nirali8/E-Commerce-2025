import mongoose from "mongoose";
import { EcomProduct } from "../models/EcomProduct";

const ProductSchema = new mongoose.Schema<EcomProduct>({
    sub_category_Id : {type:mongoose.Types.ObjectId,ref:"SubCategory" , required:true},
    product_name : {type:String , required:true},
    product_description : {type:String , required:true},
    product_logo : {type:String , required:true},
    product_images : {type:[String] , required:true},
    product_price:{type:String,required:true},
    product_brand : {type:String , required:true},
    product_quantity:{type:Number,required:true},
    isActive : {type:Boolean , default:true}
} , {timestamps:true});

const ProductTable = mongoose.model<EcomProduct>("Products", ProductSchema);
export default ProductTable;
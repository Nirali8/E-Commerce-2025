import mongoose from "mongoose";

export interface EcomSubCategory{
    category_id : mongoose.Types.ObjectId|undefined|any,
    sub_category_name : string,
    sub_category_description : string, 
    sub_category_logo : string,
    isActive : boolean,
    createdAt? : Date,
    updatedAt? : Date
}
import { Request, Response } from "express";
import SubCategoryTable from "../database/SubCategorySchema";
import { EcomSubCategory } from "../models/EcomSubCategory";
import mongoose from "mongoose";

/*
  @usage : to get all sub_category
  @method :GET
  @param : no-param
  @url : http://localhost:9988/subCategory
 */
export const getAllSubCategory = async (request: Request, response: Response) => {
  try {
    let subCategory: EcomSubCategory[] | undefined = await SubCategoryTable.find();
    if (subCategory) {
      return response.status(200).json(subCategory);
    }
  } catch (error: any) {
    return response.status(500).json({ msg: "Data not Found" });
  }
};
/*
 @usage : to get a sub_category
  @method :GET
  @param : no-param
  @url : http://localhost:9988/subCategory/subCategoryId
 */
export const getSubCategory = async (request: Request, response: Response) => {
  let { subCategoryId } = request.params;
  
  const mongoCategoryId = new mongoose.Types.ObjectId(subCategoryId);
  
  let theSubCategory: EcomSubCategory | undefined | null =
    await SubCategoryTable.findById(mongoCategoryId);
  if (!theSubCategory) {
    return response.status(404).json({
      data: null,
      error: "No Group is Found",
    });
  }
  return response.status(200).json(theSubCategory);
};
/*
    @usage : create a sub_category
    @method : POST
    @params : sub_category_name,sub_category_description,sub_category_logo
    @url : http://localhost:9988/subCategory
 */

export const createSubCategory = async (request: Request, response: Response) => {
  let { category_id,
    sub_category_name,
    sub_category_description, 
    sub_category_logo } =
    request.body;
  let theSubCategory: EcomSubCategory | null | undefined = await new SubCategoryTable({
      category_id: category_id,
      sub_category_name: sub_category_name,
      sub_category_description: sub_category_description,
      sub_category_logo:sub_category_logo
  }).save();
  if (theSubCategory) {
    return response.status(200).json({
      data: theSubCategory,
      msg: "category is created",
    });
  }
};

/*
    @usage : update a sub_category
    @method : PUT
    @params :sub_category_name,sub_category_description,sub_category_logo
    @url : http://localhost:9988/subCategory/subCategoryId
 */
export const subCategoryUpdate = async (request: Request, response: Response) => {
  try {
    let { subCategoryId } = request.params;

    let {
       sub_category_name,
    sub_category_description, 
    sub_category_logo
    } = request.body;

    let updateCategory: EcomSubCategory | null | undefined =
      await SubCategoryTable.findByIdAndUpdate(
        subCategoryId,
        { sub_category_name,sub_category_description,sub_category_logo },
        { new: true }
      );
    if (updateCategory) {
      return response.json({
        data: updateCategory,
        msg: "category updated successfully",
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
  @usage : to Delete sub_category
  @method :DELETE
  @param : categoryId
  @url : http://localhost:9988/subCategory/subCategoryId
 */

export const deleteSubCategory = async (request: Request, response: Response) => {
  let { subCategoryId } = request.params;
  let deleteCategory: EcomSubCategory | null | undefined =
    await SubCategoryTable.findByIdAndDelete(subCategoryId);
  if (deleteCategory) {
    return response.json({
      data: deleteCategory,
      msg: "subcategory Deleted successfully",
    });
  }
};

/*
  @usage : to Delete subcategory
  @method :PUT
  @param : subCategoryId
  @url : http://localhost:9988/subCategory/subCategoryId
 */

export const updateSubCategoryStatus = async (request: Request, response: Response) => {
    try {
        let { subCategoryId } = request.params;
        const mongoSubCategoryId = new mongoose.Types.ObjectId(subCategoryId);
        let updateCategory: EcomSubCategory | null | undefined =
            await SubCategoryTable.findByIdAndUpdate(
                mongoSubCategoryId,{isActive:false});
         if (updateCategory) {
            return response.json({
                data: updateCategory,
                msg: "category updated successfully",
            });
        }
    }
     catch (error) {
        console.error("Error retrieving product:", error);
        return response.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
import { Request, Response } from "express";
import CategoryTable from "../database/CategorySchema";
import { EcomCategory } from "../models/EcomCategory";
import mongoose from "mongoose";

/*
  @usage : to get all category
  @method :GET
  @param : no-param
  @url : http://localhost:9988/category
 */
export const getAllCategory = async (request: Request, response: Response) => {
  try {
    let category: EcomCategory[] | undefined = await CategoryTable.find();
    if (category) {
      return response.status(200).json(category);
    }
  } catch (error: any) {
    return response.status(500).json({ msg: "Data not Found" });
  }
};
/*
 @usage : to get a category
  @method :GET
  @param : categoryID
  @url : http://localhost:9988/category/categoryID
 */
export const getCategory = async (request: Request, response: Response) => {
  let { categoryId } = request.params;
  const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
  let theCategory: EcomCategory | undefined | null =
    await CategoryTable.findById(mongoCategoryId);
  if (!theCategory) {
    return response.status(404).json({
      data: null,
      error: "No Group is Found",
    });
  }
  return response.status(200).json(theCategory);
};
/*
    @usage : create a category
    @method : POST
    @params : category_name,category_description,category_logo
    @url : http://localhost:9988/category
 */

export const createCategory = async (request: Request, response: Response) => {
  let { category_name,category_description,category_logo} =
    request.body;
  let thecategory: EcomCategory | null | undefined = await new CategoryTable({
      category_name: category_name,
      category_description: category_description,
      category_logo: category_logo
  }).save();
  if (thecategory) {
    return response.status(200).json({
      data: thecategory,
      msg: "category is created",
    });
  }
};

/*
    @usage : update a category
    @method : PUT
    @params : category_name,category_description,category_logo
    @url : http://localhost:9988/category/categoryId
 */
export const categoryUpdate = async (request: Request, response: Response) => {
  try {
    let { categoryId } = request.params;

    let {
      category_name,
      category_description,
      category_logo,
    } = request.body;

    let updateCategory: EcomCategory | null | undefined =
      await CategoryTable.findByIdAndUpdate(
        categoryId,
        { category_name,category_description,category_logo },
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
  @usage : to Delete category
  @method :DELETE
  @param : categoryId
  @url : http://localhost:9988/category/categoryId
 */

export const deleteCategory = async (request: Request, response: Response) => {
  let { categoryId } = request.params;
  let deleteCategory: EcomCategory | null | undefined =
    await CategoryTable.findByIdAndDelete(categoryId);
  if (deleteCategory) {
    return response.json({
      data: deleteCategory,
      msg: "user Deleted successfully",
    });
  }
};

/*
  @usage : to Delete category
  @method :PUT
  @param : categoryId
  @url : http://localhost:9988/updateCategory/:categoryId
 */

export const updateCategoryStatus = async (request: Request, response: Response) => {
    try {
        let { categoryId } = request.params;
        const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
        let updateCategory: EcomCategory | null | undefined =
            await CategoryTable.findByIdAndUpdate(
                mongoCategoryId,{isActive:false});
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
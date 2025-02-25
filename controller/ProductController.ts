import { request, Request, Response } from "express";
import ProductTable from "../database/ProductSchema";
import { EcomProduct } from "../models/EcomProduct";
import mongoose from "mongoose";

/*
  @usage : to get all product
  @method :GET
  @param : no-param
  @url : http://localhost:9988/product
 */
export const getAllProduct = async (request: Request, response: Response) => {
    try {
        let product: EcomProduct[] | undefined = await ProductTable.find();
        if (product) {
            return response.status(200).json(product);
        }
    } catch (error: any) {
        return response.status(500).json({ msg: "Data not Found" });
    }
};
/*
 @usage : to get a product
  @method :GET
  @param : no-param
  @url : http://localhost:9988/product/produ tId
 */
export const getProduct = async (request: Request, response: Response) => {
    let { productId } = request.params;

    const mongoCategoryId = new mongoose.Types.ObjectId(productId);

    let theProduct: EcomProduct | undefined | null =
        await ProductTable.findById(mongoCategoryId);
    if (!theProduct) {
        return response.status(404).json({
            data: null,
            error: "No Group is Found",
        });
    }
    return response.status(200).json(theProduct);
};
/*
    @usage : create a product
    @method : POST
    @params :  sub_category_Id,
        product_name,
        product_description,
        product_logo, product_images, product_price, product_brand, product_quantity, isActive 
    @url : http://localhost:9988/subCategory
 */

export const createProduct = async (request: Request, response: Response) => {
    let { sub_category_Id,
        product_name,
        product_description,
        product_logo, product_images, product_price, product_brand, product_quantity, isActive } =
        request.body;
    let theProduct: EcomProduct | null | undefined = await new ProductTable({
        sub_category_Id: sub_category_Id,
        product_name: product_name,
        product_description: product_description,
        product_logo: product_logo,
        product_images: product_images,
        product_brand: product_brand,
        product_price: product_price,
        product_quantity: product_quantity,
        isActive: isActive
    }).save();
    if (theProduct) {
        return response.status(200).json({
            data: theProduct,
            msg: "category is created",
        });
    }
};

/*
    @usage : update a product
    @method : PUT
    @params : sub_category_Id,
        product_name,
        product_description,
        product_logo, product_images, product_price, product_brand, product_quantity, isActive 
    @url : http://localhost:9988/subCategory/subCategoryId
 */
export const updateProduct = async (request: Request, response: Response) => {
    try {
        let { productId } = request.params;

        let {
            product_name,
            product_description,
            product_logo, product_images, product_price, product_brand, product_quantity, isActive
        } = request.body;

        let updateProduct: EcomProduct | null | undefined =
            await ProductTable.findByIdAndUpdate(
                productId,
                {
                    product_name,
                    product_description,
                    product_logo, product_images, product_price, product_brand, product_quantity, isActive
                },
                { new: true }
            );
        if (updateProduct) {
            return response.json({
                data: updateProduct,
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
  @usage : to Delete product
  @method :DELETE
  @param : productId
  @url : http://localhost:9988/subCategory/subCategoryId
 */

export const deleteProduct = async (request: Request, response: Response) => {
    let { productId } = request.params;
    let deleteProduct: EcomProduct | null | undefined =
        await ProductTable.findByIdAndDelete(productId);
    if (deleteProduct) {
        return response.json({
            data: deleteProduct,
            msg: "subcategory Deleted successfully",
        });
    }
};


/*
  @usage : to Delete product
  @method :PUT
  @param : productId
  @url : http://localhost:9988/subCategory/subCategoryId
 */

export const updateProductStatus = async (request: Request, response: Response) => {
    try {
        let { productId } = request.params;
        const mongoCategoryId = new mongoose.Types.ObjectId(productId);
        let updateProduct: EcomProduct | null | undefined =
            await ProductTable.findByIdAndUpdate(
                mongoCategoryId,{isActive:false});
         if (updateProduct) {
            return response.json({
                data: updateProduct,
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

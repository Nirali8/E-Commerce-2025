import { Request, Response, Router } from "express";
import * as SubCategoryController from "../controller/SubCategoryController";
const SubCategoryRouter: Router = Router();


/*
   @usage:to get all sub_Category
   @method:GET
   @param:no-param
   @url:http://127.0.0.1:9988/subCaegory
 */

SubCategoryRouter.get("/", async (request: Request, response: Response) => {
    await SubCategoryController.getAllSubCategory(request, response);
})

/*
     @usage:to get a sub_Category

    @method:GET
    @param:no-param
    @url:http://localhost:9999/subCategory/:subCategoryId
 */
SubCategoryRouter.get("/:subCategoryId", async (request: Request, response: Response) => {
    console.log("get by id");
    await SubCategoryController.getSubCategory(request, response);
})

/*
    @usage : create a sub_Category
    @method : POST
    @params : sub_category_name,sub_category_description,sub_category_logo
    @url : http://localhost:8800/subCategory
*/

SubCategoryRouter.post("/",[
], async (request: Request, response: Response) => {
    console.log("post sub_category");
    await SubCategoryController.createSubCategory(request, response)
})

/*
    @usage : update a sub_Category

    @method : PUT
    @params : sub_category_name,sub_category_description,sub_category_logo
    @url : http://localhost:8800/subCategory/subCategoryId
*/

SubCategoryRouter.put("/:subCategoryId", async (request: Request, response: Response) => {
    console.log("pUT sub_category");
    await SubCategoryController.subCategoryUpdate(request, response);
})

/*
     @usage : delete a sub_Category
    @method : DELETE
    @params : subCategoryId
    @url : http://localhost:8800/subCategory/subCategoryId
 */
SubCategoryRouter.delete("/:subCategoryId", async (request: Request, response: Response) => {
    console.log("Delete sub_category");
    await SubCategoryController.deleteSubCategory(request,response)
   
})

/*
     @usage : delete a subcategory
    @method : PUT
    @params : subCategoryId
    @url : http://localhost:8800/updateSubCategory/:subCategoryId
 */
SubCategoryRouter.put("/updateSubCategory/:subCategoryId", async (request: Request, response: Response) => {
    console.log("isActive");
    await SubCategoryController.updateSubCategoryStatus(request,response)
})

export default SubCategoryRouter;

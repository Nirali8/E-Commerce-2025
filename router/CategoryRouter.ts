import { Request, Response, Router } from "express";
import * as categoryController from "../controller/CategoryController";
const categoryRouter: Router = Router();


/*
   @usage:to get all category
   @method:GET
   @param:no-param
   @url:http://127.0.0.1:9988/category
 */

categoryRouter.get("/", async (request: Request, response: Response) => {
    await categoryController.getAllCategory(request, response);
})

/*
     @usage:to get a category
    @method:GET
    @param:categoryId
    @url:http://localhost:9999/category/:categoryId
 */
categoryRouter.get("/:categoryId",async(request:Request,response:Response)=>{
    await categoryController.getCategory(request, response);
})

/*
    @usage : create a category
    @method : POST
    @params : 
    @url : http://localhost:8800/category
*/

categoryRouter.post("/",[
], async (request: Request, response: Response) => {
    console.log("post");
    await categoryController.createCategory(request, response)
})

/*
    @usage : update a category
    @method : PUT
    @params : categoryId
    @url : http://localhost:8800/category/:categoryId
*/

categoryRouter.put("/:categoryId", async (request: Request, response: Response) => {
    console.log("pUT category");
    await categoryController.categoryUpdate(request, response);
})

/*
     @usage : delete a category
    @method : DELETE
    @params : categoryId
    @url : http://localhost:8800/category/:categoryId
 */
categoryRouter.delete("/:categoryId", async (request: Request, response: Response) => {
    console.log("Delete category");
    await categoryController.deleteCategory(request,response)
   
})

/*
     @usage : delete a category
    @method : PUT
    @params : categoryId
    @url : http://localhost:8800/updateCategory/:categoryId
 */
categoryRouter.put("/updateCategory/:categoryId", async (request: Request, response: Response) => {
    console.log("isActive");
    await categoryController.updateCategoryStatus(request,response)
})

export default categoryRouter;

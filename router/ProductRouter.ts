import { Request, Response, Router } from "express";
import * as ProductController from "../controller/ProductController";
const productRouter: Router = Router();


/*
   @usage:to get all category
   @method:GET
   @param:no-param
   @url:http://127.0.0.1:9988/category
 */

productRouter.get("/", async (request: Request, response: Response) => {
    await ProductController.getAllProduct(request, response);
})

/*
     @usage:to get a category
    @method:GET
    @param:no-param
    @url:http://localhost:9999/category/:categoryId
 */
productRouter.get("/:productId",async(request:Request,response:Response)=>{
    await ProductController.getProduct(request, response);
})

/*
    @usage : create a category
    @method : POST
    @params : name
    @url : http://localhost:8800/category/:categoryId
*/

productRouter.post("/",[
], async (request: Request, response: Response) => {
    console.log("post");
    await ProductController.createProduct(request, response)
})

/*
    @usage : update a category
    @method : PUT
    @params : name
    @url : http://localhost:8800/category/:categoryId
*/

productRouter.put("/:productId", async (request: Request, response: Response) => {
    console.log("pUT category");
    await ProductController.updateProduct(request, response);
})

/*
     @usage : delete a category
    @method : DELETE
    @params : userId
    @url : http://localhost:8800/category/:categoryId
 */
productRouter.delete("/:productId", async (request: Request, response: Response) => {
    console.log("Delete category");
    await ProductController.deleteProduct(request,response)
})

/*
     @usage : delete a product
    @method : PUT
    @params : productid
    @url : http://localhost:8800/category/:categoryId
 */
productRouter.put("/updateProduct/:productId", async (request: Request, response: Response) => {
    console.log("isActive");
    await ProductController.updateProductStatus(request,response)
})

export default productRouter;

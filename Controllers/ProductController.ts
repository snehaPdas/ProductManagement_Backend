import { Request, Response, NextFunction } from "express"
import ProductService from "../services/productService"
import { IProductService } from "../interface/product/Product.service.interface"

class ProductController{
private _productService:IProductService
constructor(productServiceInstance: IProductService) { 
    this._productService = productServiceInstance;  
  }
async addCategory(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
        const categoryName=req.body.name
        console.log("category name",categoryName)
        await this._productService.addCategory(categoryName)
        res.status(200).json({message:"added successfully"})
    } catch (error:any) {
        if(error.message==="category already exists"){
            res.status(400).json({message:"already existed category"})

        }else{
            res.status(500).json({ message: "Internal Server Error" })

        }


    }

}
async getCategory(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
        const categories = await this._productService.getCategories()
        res.status(200).json(categories);


    } catch (error) {
        console.error("Error fetching categories:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}
async addSubCategory(req: Request, res: Response, next: NextFunction):Promise<any>{
    console.log("reached in subcategory------------")
    try {
        const { categoryName, subCategoryName } = req.body
        
        const subCategory=await this._productService.addSubCategory(categoryName, subCategoryName)
        return res.status(200).json({ message: "Subcategory added successfully", subCategory })

    } catch (error:any) {
        if(error.message==="Subcategory already exists"){
            res.status(409).json("Subcategory already exists")
        }
        if(error.message==="category not exists"){
            res.status(400).json({message:"already not category"})

        }else{
            res.status(500).json({ message: "Internal Server Error" })

        }
    }

}
async addProduct(req: Request, res: Response, next: NextFunction):Promise<any>{
try {
    const { name, category, subcategory } = req.body
    const imageFile = req.file

    const addProduct=await this._productService.addProduct(name, category, subcategory,imageFile)
    return res.status(200).json({ message: "product added successfully", addProduct })

} catch (error:any) {
    if(error.message==="Invalid category"){
        res.status(400).json("Invalid category")
    }
    if(error.message==="Invalid subcategory"){
        res.status(400).json({message:"Invalid subcategory"})

    }else{
        res.status(500).json({ message: "Internal Server Error" })

    }

}
}
async getproduct(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
        const products = await this._productService.getproduct()
        console.log("??????????/",)
        res.status(200).json(products)


    } catch (error) {
        console.error("Error fetching products:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}

}

export default ProductController;


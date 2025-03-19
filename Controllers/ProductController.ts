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
    
        res.status(200).json(products)


    } catch (error) {
        console.error("Error fetching products:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}
async addWishList(req: Request, res: Response, next: NextFunction):Promise<any>{

    try {
        const { productId } = req.body
       const addwishList=await this._productService.addWishList(productId)
       return res.status(200).json({ message: "product added successfully", addwishList })

        
    } catch (error:any) {
       if( error.message==="wishlist already exist"){
        console.log("77")
        res.status(400).json({message:"wishlist already existed"})
       }else{
        res.status(500).json({ message: "Internal Server Error" })

       }
        
    }
}
async getWishList(req: Request, res: Response, next: NextFunction):Promise<any>{
    console.log("1")
    try {
        const wishList = await this._productService.getWishList()

        res.status(200).json(wishList);


    } catch (error) {
        res.status(500).json({ error: "Error fetching wishlist" })

    }

}
async removeWishlist(req: Request, res: Response, next: NextFunction):Promise<any>{
    console.log("yes reached in remove")
    try {
        const {productId}=req.params
        console.log("_________",productId)
        const removeWishlist=await this._productService.removeWishList(productId)
        return res.status(200).json({ message: "product deleted successfully", removeWishlist })

    } catch (error:any) {
        if( error.message==="wishlist already exist"){
            
            res.status(400).json({message:"wishlist already existed"})
           }else{
            res.status(500).json({ message: "Internal Server Error" })
    
           }
    }
}
async getselectedproduct(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
        const {productId}=req.params
        const products = await this._productService.getselectedproduct(productId)
    console.log("yes got particular product details",products)
        res.status(200).json(products)


    } catch (error) {
        console.error("Error fetching products:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}
async updateproduct(req: Request, res: Response, next: NextFunction):Promise<any>{
    console.log("hittttttt")
    try {
        const {productId}=req.params
        const formData=req.body
        const imageFile = req.file ? req.file.buffer : null;
        console.log("Product ID:", productId);
        console.log("Received Form Data:", formData);
        console.log("Uploaded Image:", imageFile ? "Buffer received" : "No file uploaded");

        if (imageFile) {
            console.log("Image Buffer Size:", imageFile);
        }
        const response=await this._productService.updateproduct(productId,formData,imageFile)
        return res.status(200).json({ message: "product edited successfully", response })

    } catch (error) {
        console.log(error)
    }

}

}

export default ProductController;


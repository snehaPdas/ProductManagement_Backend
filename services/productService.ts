
import { IProductService } from "../interface/product/Product.service.interface"
import { IProductRepository } from "../interface/product/Product.repository.interface"
import { uploadToCloudinary } from "../Config/cloudinary"
class ProductService implements IProductService{
    private _productRepository:IProductRepository
    constructor(productRepository:IProductRepository){
        this._productRepository=productRepository
    }
    async addCategory(categoryName:string){
        try {
            const exist =await this._productRepository.findExistCategory(categoryName)
            if(exist){
             throw new Error("category already exists");
     
            }
            await this._productRepository.addcategory(categoryName)
       
        } catch (error) {
            throw error

        }
    
    }
    async getCategories(){
        try {
            return await this._productRepository.getCategory()
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    async addSubCategory(categoryName:string,subCategoryName:string){
        try {
         let updatedCategory= await this._productRepository.addSubCategory(categoryName,subCategoryName) 
         if (!updatedCategory) {
            throw new Error("category not exists")
          }
          const newSubCategory = updatedCategory.subcategories.slice(-1)[0]
          return newSubCategory
        } catch (error:any) {
        
            console.log(error)
            throw error
        }
    }
    async addProduct(name:string, category:string, subcategory:string,imageFile:any){
        try {
            let imageUrl=""
            if(imageFile){
                const folder = "productImages"
                const result = await uploadToCloudinary(imageFile.buffer, folder);
                imageUrl = result.secure_url;
    
            }
            let categorydoc=await this._productRepository.addProduct(name,category,subcategory,imageUrl)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async getproduct(){
        try {
            return await this._productRepository.getproduct()
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    async addWishList(productId:string){
        try {
             const existedWishList=await this._productRepository.existedWishList(productId)
             if(existedWishList){
                
                throw new Error("wishlist already exist")
             }
             const addWishList=await this._productRepository.addWishList(productId)
             return addWishList
        } catch (error) {
            console.log(error)
            throw error

        }

    }
    
    async getWishList(){
        try {
            return await this._productRepository.getWishlist()

        } catch (error) {
            console.log("error in service getting wishlist",error)
        }
    }
    async removeWishList(productId:string){
try {
    const existedWishList=await this._productRepository.existedWishList(productId)
    if(existedWishList){
       
       throw new Error("wishlist already exist")
    }
    const removeWishList=await this._productRepository.removeWishList(productId)

return removeWishList
} catch (error) {
      console.log(error)
            throw error

}
    }

}

export default  ProductService
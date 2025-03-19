export interface IProductService{
    addCategory(categoryName:string):Promise<any>
    getCategories():Promise<any>
    addSubCategory(categoryName:string, subCategoryName:string):Promise<any>
    addProduct(name:string, category:string, subcategory:string,imageFile:any):Promise<any>
    getproduct():Promise<any>
    addWishList(productId:string):Promise<any>
    getWishList():Promise<any>
    removeWishList(productId:string):Promise<any>
    getselectedproduct(productId:string):Promise<any>
    updateproduct(productId:string,formData:any,imageFile:any):Promise<any>

}
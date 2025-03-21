export interface IProductRepository{
    findExistCategory(categoryName:string):Promise<any>
    addcategory(categoryName:string):Promise<any>
    getCategory():Promise<any>
    addSubCategory(categoryName:string,subCategoryName:string):Promise<any>
    addProduct(name:string,category:string,subcategory:string,imageUrl:string):Promise<any>
    getproduct():Promise<any>
    existedWishList(productId:string):Promise<any>
    addWishList(productId:string):Promise<any>
    getWishlist():Promise<any>
    removeWishList(productId:string):Promise<any>
    getselectedproduct(productId:string):Promise<any>
    updateproduct(productId:string,formData:any,imageUrl:any):Promise<any>

}
import ProductModel from "../model/productModel"
import CategoryMoel from "../model/categoryModel"
import WishListModel from "../model/wishListModel"
import { IProductRepository } from "../interface/product/Product.repository.interface"
class ProductRepository implements IProductRepository{
    private _productModel=ProductModel
    private _categoryModel=CategoryMoel
    private  _wishListModel=WishListModel

    async findExistCategory(categoryName:any){
        console.log("cateeeeeeeee",categoryName)
        try {
            const exist=await this._categoryModel.findOne({ name:categoryName })
            console.log("exist",exist)
            return exist
        } catch (error) {
            console.error("error in exist category",error)
            throw error;

        }
      


    }
    async addcategory(categoryName:string){
        console.log(",,,,,,,,,,,")
try {
    const name=categoryName
    console.log("name is",name)
    const newCategory = new this._categoryModel({
        name: categoryName,
        subcategories: [],
    });

   // console.log("newCategory",newCategory)
    const savedCategory = await newCategory.save()
    console.log("saved")
    return savedCategory

} catch (error) {
    console.log(error)

    throw Error
}
    }

    async getCategory(){
        try {
            const categories = await this._categoryModel.find()
            return categories


        } catch (error) {
            console.error("Error fetching categories:", error)
            throw new Error("Failed to fetch categories")
        }
    }
    async addSubCategory(categoryName: string, subCategoryName: string) {
        try {
            const category = await this._categoryModel.findOne({ name: categoryName });
    
            if (!category) {
                throw new Error("Category not found");
            }
    
            // Check if the subcategory already exists
            const subcategoryExists = category.subcategories.some(
                (sub: { name: string }) => sub.name.toLowerCase() === subCategoryName.toLowerCase()
            )
    
            if (subcategoryExists) {
                throw new Error("Subcategory already exists");
            }
    
            // If not, push the new subcategory
            const updatedCategory = await this._categoryModel.findOneAndUpdate(
                { name: categoryName },
                { $push: { subcategories: { name: subCategoryName } } },
                { new: true }
            );
    
            return updatedCategory;
        } catch (error) {
            console.error("Error adding subcategories:", error);
           // throw error
        }
    }

    async addProduct(name:string,category:string,subcategory:string,imageUrl:string)
{
try {
    const categoryDoc = await this._categoryModel.findOne({ name: category })
    if (!categoryDoc) {
        throw new Error("Invalid category")

    }
    const subCategoryDoc = categoryDoc.subcategories.find(sub => sub.name === subcategory)
        if (!subCategoryDoc) {
            throw new Error("Invalid subcategory");
        }
        const newProduct=new this._productModel({
            pName:name,
            pImage: imageUrl,
            category: categoryDoc._id,
            subCategory: subCategoryDoc._id
        })
        const savedProduct = await newProduct.save()

} catch (error) {
    console.error("Error adding products:", error)

}
}

async getproduct(){
    try {
        const products = await this._productModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { 
                $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } 
            },
            {
                $addFields: {
                    matchedSubCategory: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$categoryDetails.subcategories",
                                    as: "subCat",
                                    cond: { $eq: ["$$subCat._id", "$subCategory"] }
                                }
                            },
                            0
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 1, 
                    pName: 1, 
                    pImage: 1, 
                    category: "$categoryDetails.name",
                    subCategory: { $ifNull: ["$matchedSubCategory.name", "Unknown"] } 
                }
            }
        ]);


return products
    } catch (error) {
        console.error("Error fetching categories:", error)
        throw new Error("Failed to fetch categories")
    }
}
async existedWishList(productId:string){
    console.log("reached existed wishlist")
    try {
        const existedWishList=await this._wishListModel.findOne({productId})
        console.log("existedWishList?????/",existedWishList)
        return existedWishList
    } catch (error) {
        console.error("Error in existingwishlist:", error);
            throw error;
    }

}
async addWishList(productId:string){
try {
   const addWishList= await this._wishListModel.create({ productId })
return addWishList
} catch (error) {
    console.error("Error adding wishlist:", error);
}
}
async getWishlist(){
    try {
        const wishlist = await this._wishListModel.find().populate("productId")
        return wishlist

    } catch (error) {
        console.log("error in wishlistgetting",error)
    }
}
    
    

}

export default ProductRepository
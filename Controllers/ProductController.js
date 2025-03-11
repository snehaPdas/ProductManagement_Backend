const Category=require("../model/CategoryModel")
const Product =require("../model/ProductModel")
const Wishlist=require("../model/WishListModel")
const  {uploadToCloudinary }=require("../Config/clodinary")
const mongoose = require("mongoose");


const addcategory=async(req,res)=>{
    console.log("reached category--------")
try {
    const { name } = req.body;
    const exist=await Category.findOne({ name })
    if(exist){
        return res.status(400).json({ message: "Category already exists" });

    }

    console.log("name is ",name)
    const newCategory=new Category({name,subcategories:[]})
    await newCategory.save()
    console.log("Category saved:", newCategory)
    res.status(201).json(newCategory)


} catch (error) {
    console.error("Error adding category:", error);

    res.status(500).json({ message: "Error adding category", error: error.message });

}
}


const addsubcategory=async(req,res)=>{
    try{
    const { categoryName, subCategoryName } = req.body
    const updatedCategory =await Category.findOneAndUpdate({name:categoryName},
        {
            $push:{subcategories:{name:subCategoryName}}
        },{
            new:true
        }
    )
    if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      const newSubCategory = updatedCategory.subcategories.slice(-1)[0];
      res.status(201).json(newSubCategory);
    }catch(error){
        console.error("Error adding subcategory:", error);
        res.status(500).json({ message: "Error adding subcategory", error });


    }
}

const getCategory=async(req,res)=>{
    console.log("???????/")
    try {
        console.log("//////////")
        const categories =await Category.find()
        console.log("categories are",categories)
        res.json(categories);

    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });

    }
}

const addProduct=async(req,res)=>{
    try {
        const { name, category, subcategory } = req.body;
        console.log("????????/",req.body)
        console.log("Received Product Data:", JSON.stringify(req.body, null, 2));
        const categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            return res.status(400).json({ success: false, message: "Invalid category" });
        }

        const subCategoryDoc = categoryDoc.subcategories.find(sub => sub.name === subcategory);
        if (!subCategoryDoc) {
            return res.status(400).json({ success: false, message: "Invalid subcategory" });
        }

        const imageFile = req.file
        console.log("image file is",imageFile)
        let imageUrl=""
        if(imageFile){
            const folder = "productImages"
            const result = await uploadToCloudinary(imageFile.buffer, folder);
            imageUrl = result.secure_url;

        }
        const newProduct=new Product({
            pName:name,
            pImage: imageUrl,
            category: categoryDoc._id,
            subCategory: subCategoryDoc._id
        })
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, product: savedProduct });



    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });

    }
}
const getProduct = async (req, res) => {
    console.log("Fetching products...");

    try {
        const products = await Product.aggregate([
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

        console.log("Fetched products:", products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}

const addWishList=async(req,res)=>{
    try {
        console.log("reached wishlist*******")
        const { productId } = req.body
        const existingItem = await Wishlist.findOne({ productId })
        if (!existingItem) {
            await Wishlist.create({ productId });
          }
          const updatedWishlist = await Wishlist.find();
          res.json(updatedWishlist);
        } catch (error) {
          res.status(500).json({ error: "Error adding to wishlist" });
        }
          

    

}
const getWishList=async(req,res)=>{
    try {
        const wishlist = await Wishlist.find().populate("productId")
        res.json(wishlist)
      } catch (error) {
        res.status(500).json({ error: "Error fetching wishlist" })
      }
}



const removeWishList = async (req, res) => {
    console.log("Removing from wishlist:", req.params.id)

    try {
        const productId = req.params.id
        console.log("pid",productId)

        const existingItem = await Wishlist.findOne( {_id:productId} )

        console.log("casual check",existingItem)
        if (!existingItem) {
            return res.status(404).json({ error: "Product not found in wishlist" });
        }
        console.log("1")
        await Wishlist.deleteOne({ _id:productId })
        console.log("2")

        const updatedWishlist = await Wishlist.find();
        res.json(updatedWishlist);
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ error: "Error removing from wishlist" });
    }
};






module.exports={
    addcategory,
    addsubcategory,
    getCategory,
    addProduct,
    getProduct,
    addWishList,
    getWishList,
    removeWishList
    
}
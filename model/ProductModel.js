const mongoose=require("mongoose")
const productSchema= new mongoose.Schema({
    pName:{
        type:String
    },
    pImage:{
      type:String
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" } 


})

const Product=mongoose.model("Product",productSchema)
module.exports=Product
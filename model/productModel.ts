import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Product document
interface IProduct extends Document {
  pName: string
  pImage: string
  category: mongoose.Types.ObjectId
  subCategory: mongoose.Types.ObjectId
}

// Create the Product schema
const productSchema = new Schema<IProduct>({
  pName: {
    type: String,
    required: true,
  },
  pImage: {
    type: String,
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

// Create and export the Product model
const Product = mongoose.model<IProduct>("Product", productSchema)
export default Product

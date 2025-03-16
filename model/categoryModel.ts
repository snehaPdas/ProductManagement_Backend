import mongoose, { Schema, Document } from "mongoose"

// Define TypeScript interface for subcategories
interface ISubcategory {
  _id: mongoose.Types.ObjectId
  name: string
}


export interface ICategory extends Document {
  name: string;
  subcategories: ISubcategory[];
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  subcategories: [
    {
      _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
      name: { type: String, required: true }
    }
  ]
});


const Category = mongoose.model<ICategory>("Category", categorySchema)
export default Category

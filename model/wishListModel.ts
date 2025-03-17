import mongoose, { Schema, Document } from "mongoose";


interface IWishlist extends Document {
  productId: mongoose.Types.ObjectId;
}


const WishlistSchema = new Schema<IWishlist>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }
});


const Wishlist = mongoose.model<IWishlist>("Wishlist", WishlistSchema);
export default Wishlist;

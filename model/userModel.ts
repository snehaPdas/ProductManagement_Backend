import mongoose, { Schema, Document, Model } from "mongoose"

// Define an interface for TypeScript
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}


const userSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)


const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default UserModel

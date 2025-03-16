import UserModel from "../model/userModel";
import { IUserRepository } from "../interface/user/User.repository.interface"

class UserRepository implements IUserRepository {
    private _userModel = UserModel

    async existingUser(email: any): Promise<any> {
        try {
          
            
            console.log("Checking if user exists...")
            const user = await this._userModel.findOne({ email }).exec()
            return user
        } catch (error) {
            console.error("Error in existingUser:", error);
            throw error;
        }
    }

    async createNewUser(name: string, email: string, password: string): Promise<any> {
        try {
            console.log("Creating new user...")
            const newUser = new this._userModel({ name, email, password })
            
            await newUser.save()
            console.log("User created successfully!")
            return newUser
        } catch (error) {
            console.error("Error in createNewUser:", error)
            throw error;
        }
    }
    
    async findUser(email:string){
        try {
            console.log("email",email)
            return await this._userModel.findOne({email})


        } catch (error) {
            console.log("error finding user login:", error)
            return null;
        }
    }
}

export default  UserRepository

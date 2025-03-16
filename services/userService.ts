import { IUserService } from "../interface/user/User.service.interface"
import { IUserRepository } from "../interface/user/User.repository.interface"

class UserService implements IUserService {
    private _userRepository: IUserRepository
    
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async signup(name:any,email:any,password:any):Promise<any>{
try {
    console.log("reached signup")
    const existedUser=await this._userRepository.existingUser(email)
    if (existedUser) {
        throw new Error("User already exists");
    }

    await this._userRepository.createNewUser(name,email,password)


} catch (error) {
    console.log(error)
    throw error
    
}
  }
 async login(loginDta:any){
  try {
    const email=loginDta.email
    const findUser=await this._userRepository.findUser(email)
    if(!findUser){
      throw new Error("User Not Found")
      console.log("USER NOT FOUND")
    }
    return findUser
  } catch (error) {
    console.log(error)
    throw error
  }

 }

}

export default UserService

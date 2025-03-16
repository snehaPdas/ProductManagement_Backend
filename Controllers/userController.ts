import { Request, Response, NextFunction } from "express"


import UserService from "../services/userService";
import { IUserService } from "../interface/user/User.service.interface";


class UserController{
    private _userService:IUserService
constructor(userServiceInstance:UserService){
    this._userService=userServiceInstance
}
    async signup(req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            console.log("reached in controller")
            const name=req.body.name
            const email=req.body.email
            const password=req.body.password
            console.log("------",email)
            await this._userService.signup(name,email,password)
            res.status(200).json({message:"register successfully"})
            
        } catch (error:any) {
            if(error.message==="User already exists"){
                console.log("ÿes error")
           res.status(400).json({message:"already existed user"})
            }else{
                res.status(500).json({ message: "Internal Server Error" })

            }
        }
    }
    async login(req: Request, res: Response, next: NextFunction):Promise<void>{
        try {
            const loginData=req.body
            let user=await this._userService.login(loginData)
            res.status(200).json({message:"logged successfully"})
            
        } catch (error:any) {
            if(error.message==="User Not Found"){
                res.status(400).json({message:"user not found"})
            }else{
                res.status(500).json({ message: "Internal Server Error" })
            }
            
        }

    }

}

export default UserController

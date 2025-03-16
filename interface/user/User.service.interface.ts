export interface IUserService{

    signup(name:any,email:any,password:any):Promise<any>
    login(loginData:any):Promise<any>

}
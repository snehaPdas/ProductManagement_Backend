export interface IUserRepository{
existingUser(email:any):Promise<any>
createNewUser(name:any,email:any,password:any):Promise<any>
findUser(email:string):Promise<any>

}
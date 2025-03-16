import  express  from "express"
import UserRepository  from "../repositories/userRepository"
import UserService from "../services/userService"
import UserController from "../Controllers/userController"

const router =express.Router()
console.log("routrrrrrrrrr")

const userRepositoryInstance = new UserRepository()
const userServiceInstance=new UserService(userRepositoryInstance)
const userControllerInstance = new UserController(userServiceInstance)



router.post("/signup",userControllerInstance.signup.bind(userControllerInstance))
router.post("/login",userControllerInstance.login.bind(userControllerInstance))

export default router

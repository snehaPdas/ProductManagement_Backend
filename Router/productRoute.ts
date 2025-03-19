import  express  from "express"
import multer from "multer"
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

import ProductRepository from "../repositories/productRepository"
import ProductService from "../services/productService"
import ProductController from "../Controllers/ProductController"
console.log("Imported ProductController:", ProductController)

const router =express.Router()


const productRepositoryInstance=new ProductRepository()
const productServiceInstance = new ProductService(productRepositoryInstance)
const productControllerInstance=new ProductController(productServiceInstance)


router.post("/category",productControllerInstance.addCategory.bind(productControllerInstance))
router.get("/getcategory",productControllerInstance.getCategory.bind(productControllerInstance))
router.post("/subcategory",productControllerInstance.addSubCategory.bind(productControllerInstance))
router.post("/addproduct",upload.single("image"),productControllerInstance.addProduct.bind(productControllerInstance))
router.get("/getproduct",productControllerInstance.getproduct.bind(productControllerInstance))
router.post("/addwishlist",productControllerInstance.addWishList.bind(productControllerInstance))
router.get("/getwishlist",productControllerInstance.getWishList.bind(productControllerInstance))
router.delete("/removewishlist/:productId",productControllerInstance.removeWishlist.bind(productControllerInstance))



export default router
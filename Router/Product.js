const express=require("express")
const router=express.Router()
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });


const productController=require("../Controllers/ProductController")

router.post("/category",productController.addcategory)
router.post("/subcategory",productController.addsubcategory)
router.get("/getcategory",productController.getCategory)
router.post("/addproduct",upload.single("image"),productController.addProduct)
router.get("/getproduct",productController.getProduct)
router.post("/addwishlist",productController.addWishList)
router.get("/getwishlist",productController.getWishList)
router.delete("/removewishlist/:id", productController.removeWishList);





module.exports = router
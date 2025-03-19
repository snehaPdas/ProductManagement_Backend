"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ProductController {
    constructor(productServiceInstance) {
        this._productService = productServiceInstance;
    }
    addCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryName = req.body.name;
                console.log("category name", categoryName);
                yield this._productService.addCategory(categoryName);
                res.status(200).json({ message: "added successfully" });
            }
            catch (error) {
                if (error.message === "category already exists") {
                    res.status(400).json({ message: "already existed category" });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            }
        });
    }
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this._productService.getCategories();
                res.status(200).json(categories);
            }
            catch (error) {
                console.error("Error fetching categories:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    addSubCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("reached in subcategory------------");
            try {
                const { categoryName, subCategoryName } = req.body;
                const subCategory = yield this._productService.addSubCategory(categoryName, subCategoryName);
                return res.status(200).json({ message: "Subcategory added successfully", subCategory });
            }
            catch (error) {
                if (error.message === "Subcategory already exists") {
                    res.status(409).json("Subcategory already exists");
                }
                if (error.message === "category not exists") {
                    res.status(400).json({ message: "already not category" });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            }
        });
    }
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, category, subcategory } = req.body;
                const imageFile = req.file;
                const addProduct = yield this._productService.addProduct(name, category, subcategory, imageFile);
                return res.status(200).json({ message: "product added successfully", addProduct });
            }
            catch (error) {
                if (error.message === "Invalid category") {
                    res.status(400).json("Invalid category");
                }
                if (error.message === "Invalid subcategory") {
                    res.status(400).json({ message: "Invalid subcategory" });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            }
        });
    }
    getproduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this._productService.getproduct();
                res.status(200).json(products);
            }
            catch (error) {
                console.error("Error fetching products:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    addWishList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.body;
                const addwishList = yield this._productService.addWishList(productId);
                return res.status(200).json({ message: "product added successfully", addwishList });
            }
            catch (error) {
                if (error.message === "wishlist already exist") {
                    console.log("77");
                    res.status(400).json({ message: "wishlist already existed" });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            }
        });
    }
    getWishList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("1");
            try {
                const wishList = yield this._productService.getWishList();
                res.status(200).json(wishList);
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching wishlist" });
            }
        });
    }
    removeWishlist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("yes reached in remove");
            try {
                const { productId } = req.params;
                console.log("_________", productId);
                const removeWishlist = yield this._productService.removeWishList(productId);
                return res.status(200).json({ message: "product deleted successfully", removeWishlist });
            }
            catch (error) {
                if (error.message === "wishlist already exist") {
                    res.status(400).json({ message: "wishlist already existed" });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            }
        });
    }
    getselectedproduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const products = yield this._productService.getselectedproduct(productId);
                console.log("yes got particular product details", products);
                res.status(200).json(products);
            }
            catch (error) {
                console.error("Error fetching products:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    updateproduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hittttttt");
            try {
                const { productId } = req.params;
                const formData = req.body;
                const imageFile = req.file ? req.file.buffer : null;
                console.log("Product ID:", productId);
                console.log("Received Form Data:", formData);
                console.log("Uploaded Image:", imageFile ? "Buffer received" : "No file uploaded");
                if (imageFile) {
                    console.log("Image Buffer Size:", imageFile);
                }
                const response = yield this._productService.updateproduct(productId, formData, imageFile);
                return res.status(200).json({ message: "product edited successfully", response });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ProductController;

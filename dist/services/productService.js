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
const cloudinary_1 = require("../Config/cloudinary");
class ProductService {
    constructor(productRepository) {
        this._productRepository = productRepository;
    }
    addCategory(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this._productRepository.findExistCategory(categoryName);
                if (exist) {
                    throw new Error("category already exists");
                }
                yield this._productRepository.addcategory(categoryName);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._productRepository.getCategory();
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addSubCategory(categoryName, subCategoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedCategory = yield this._productRepository.addSubCategory(categoryName, subCategoryName);
                if (!updatedCategory) {
                    throw new Error("category not exists");
                }
                const newSubCategory = updatedCategory.subcategories.slice(-1)[0];
                return newSubCategory;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addProduct(name, category, subcategory, imageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imageUrl = "";
                if (imageFile) {
                    const folder = "productImages";
                    const result = yield (0, cloudinary_1.uploadToCloudinary)(imageFile.buffer, folder);
                    imageUrl = result.secure_url;
                }
                let categorydoc = yield this._productRepository.addProduct(name, category, subcategory, imageUrl);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getproduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._productRepository.getproduct();
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addWishList(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existedWishList = yield this._productRepository.existedWishList(productId);
                if (existedWishList) {
                    throw new Error("wishlist already exist");
                }
                const addWishList = yield this._productRepository.addWishList(productId);
                return addWishList;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getWishList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._productRepository.getWishlist();
            }
            catch (error) {
                console.log("error in service getting wishlist", error);
            }
        });
    }
    removeWishList(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existedWishList = yield this._productRepository.existedWishList(productId);
                if (existedWishList) {
                    throw new Error("wishlist already exist");
                }
                const removeWishList = yield this._productRepository.removeWishList(productId);
                return removeWishList;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getselectedproduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._productRepository.getselectedproduct(productId);
            }
            catch (error) {
                console.log("fetching particular product details", error);
            }
        });
    }
    updateproduct(productId, formData, imageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("???????");
            try {
                let imageUrl = "";
                console.log("(((", imageFile);
                if (imageFile) {
                    console.log(">>");
                    const folder = "productImages";
                    const result = yield (0, cloudinary_1.uploadToCloudinary)(imageFile, folder);
                    imageUrl = result.secure_url;
                    let categorydoc = yield this._productRepository.updateproduct(productId, formData, imageUrl);
                    return categorydoc;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ProductService;

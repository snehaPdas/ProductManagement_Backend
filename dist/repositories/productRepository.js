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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../model/productModel"));
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const wishListModel_1 = __importDefault(require("../model/wishListModel"));
class ProductRepository {
    constructor() {
        this._productModel = productModel_1.default;
        this._categoryModel = categoryModel_1.default;
        this._wishListModel = wishListModel_1.default;
    }
    findExistCategory(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("cateeeeeeeee", categoryName);
            try {
                const exist = yield this._categoryModel.findOne({ name: categoryName });
                console.log("exist", exist);
                return exist;
            }
            catch (error) {
                console.error("error in exist category", error);
                throw error;
            }
        });
    }
    addcategory(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(",,,,,,,,,,,");
            try {
                const name = categoryName;
                console.log("name is", name);
                const newCategory = new this._categoryModel({
                    name: categoryName,
                    subcategories: [],
                });
                // console.log("newCategory",newCategory)
                const savedCategory = yield newCategory.save();
                console.log("saved");
                return savedCategory;
            }
            catch (error) {
                console.log(error);
                throw Error;
            }
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this._categoryModel.find();
                return categories;
            }
            catch (error) {
                console.error("Error fetching categories:", error);
                throw new Error("Failed to fetch categories");
            }
        });
    }
    addSubCategory(categoryName, subCategoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this._categoryModel.findOne({ name: categoryName });
                if (!category) {
                    throw new Error("Category not found");
                }
                // Check if the subcategory already exists
                const subcategoryExists = category.subcategories.some((sub) => sub.name.toLowerCase() === subCategoryName.toLowerCase());
                if (subcategoryExists) {
                    throw new Error("Subcategory already exists");
                }
                // If not, push the new subcategory
                const updatedCategory = yield this._categoryModel.findOneAndUpdate({ name: categoryName }, { $push: { subcategories: { name: subCategoryName } } }, { new: true });
                return updatedCategory;
            }
            catch (error) {
                console.error("Error adding subcategories:", error);
                // throw error
            }
        });
    }
    addProduct(name, category, subcategory, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryDoc = yield this._categoryModel.findOne({ name: category });
                if (!categoryDoc) {
                    throw new Error("Invalid category");
                }
                const subCategoryDoc = categoryDoc.subcategories.find(sub => sub.name === subcategory);
                if (!subCategoryDoc) {
                    throw new Error("Invalid subcategory");
                }
                const newProduct = new this._productModel({
                    pName: name,
                    pImage: imageUrl,
                    category: categoryDoc._id,
                    subCategory: subCategoryDoc._id
                });
                const savedProduct = yield newProduct.save();
            }
            catch (error) {
                console.error("Error adding products:", error);
            }
        });
    }
    getproduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this._productModel.aggregate([
                    {
                        $lookup: {
                            from: "categories",
                            localField: "category",
                            foreignField: "_id",
                            as: "categoryDetails"
                        }
                    },
                    {
                        $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true }
                    },
                    {
                        $addFields: {
                            matchedSubCategory: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$categoryDetails.subcategories",
                                            as: "subCat",
                                            cond: { $eq: ["$$subCat._id", "$subCategory"] }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            pName: 1,
                            pImage: 1,
                            category: "$categoryDetails.name",
                            subCategory: { $ifNull: ["$matchedSubCategory.name", "Unknown"] }
                        }
                    }
                ]);
                return products;
            }
            catch (error) {
                console.error("Error fetching categories:", error);
                throw new Error("Failed to fetch categories");
            }
        });
    }
    existedWishList(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("reached existed wishlist");
            try {
                const existedWishList = yield this._wishListModel.findOne({ productId });
                console.log("existedWishList?????/", existedWishList);
                return existedWishList;
            }
            catch (error) {
                console.error("Error in existingwishlist:", error);
                throw error;
            }
        });
    }
    addWishList(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addWishList = yield this._wishListModel.create({ productId });
                return addWishList;
            }
            catch (error) {
                console.error("Error adding wishlist:", error);
            }
        });
    }
    getWishlist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishlist = yield this._wishListModel.find().populate("productId");
                return wishlist;
            }
            catch (error) {
                console.log("error in wishlistgetting", error);
            }
        });
    }
    removeWishList(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._wishListModel.deleteOne({ _id: productId });
                const updatedWishlist = yield this._wishListModel.find();
                return updatedWishlist;
            }
            catch (error) {
                console.log("error in wishlistremove", error);
            }
        });
    }
    getselectedproduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this._productModel.findById(productId);
                return product;
            }
            catch (error) {
                console.error("Error fetching product:", error);
            }
        });
    }
    updateproduct(productId, formData, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("form data is", formData);
                const updateData = {
                    pName: formData.name,
                    category: formData.category,
                    subCategory: formData.subCategory,
                    pImage: imageUrl
                };
                const updatedProduct = yield this._productModel.findByIdAndUpdate(productId, { $set: updateData }, { new: true });
                if (!updatedProduct) {
                    throw new Error("Product not found");
                }
                console.log("Product updated successfully:", updatedProduct);
                return updatedProduct;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = ProductRepository;

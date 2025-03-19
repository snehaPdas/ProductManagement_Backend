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
const userModel_1 = __importDefault(require("../model/userModel"));
class UserRepository {
    constructor() {
        this._userModel = userModel_1.default;
    }
    existingUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Checking if user exists...");
                const user = yield this._userModel.findOne({ email }).exec();
                return user;
            }
            catch (error) {
                console.error("Error in existingUser:", error);
                throw error;
            }
        });
    }
    createNewUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Creating new user...");
                const newUser = new this._userModel({ name, email, password });
                yield newUser.save();
                console.log("User created successfully!");
                return newUser;
            }
            catch (error) {
                console.error("Error in createNewUser:", error);
                throw error;
            }
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("email", email);
                return yield this._userModel.findOne({ email });
            }
            catch (error) {
                console.log("error finding user login:", error);
                return null;
            }
        });
    }
}
exports.default = UserRepository;

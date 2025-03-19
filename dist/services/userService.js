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
class UserService {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }
    signup(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("reached signup");
                const existedUser = yield this._userRepository.existingUser(email);
                if (existedUser) {
                    throw new Error("User already exists");
                }
                yield this._userRepository.createNewUser(name, email, password);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    login(loginDta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = loginDta.email;
                const findUser = yield this._userRepository.findUser(email);
                if (!findUser) {
                    throw new Error("User Not Found");
                    console.log("USER NOT FOUND");
                }
                return findUser;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = UserService;

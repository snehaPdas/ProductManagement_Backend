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
class UserController {
    constructor(userServiceInstance) {
        this._userService = userServiceInstance;
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("reached in controller");
                const name = req.body.name;
                const email = req.body.email;
                const password = req.body.password;
                console.log("------", email);
                yield this._userService.signup(name, email, password);
                res.status(200).json({ message: "register successfully" });
            }
            catch (error) {
                if (error.message === "User already exists") {
                    console.log("ÿes error");
                    res.status(400).json({ message: "already existed user" });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = req.body;
                let user = yield this._userService.login(loginData);
                res.status(200).json({ message: "logged successfully" });
            }
            catch (error) {
                if (error.message === "User Not Found") {
                    res.status(400).json({ message: "user not found" });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            }
        });
    }
}
exports.default = UserController;

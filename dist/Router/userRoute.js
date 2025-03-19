"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const userService_1 = __importDefault(require("../services/userService"));
const userController_1 = __importDefault(require("../Controllers/userController"));
const router = express_1.default.Router();
console.log("routrrrrrrrrr");
const userRepositoryInstance = new userRepository_1.default();
const userServiceInstance = new userService_1.default(userRepositoryInstance);
const userControllerInstance = new userController_1.default(userServiceInstance);
router.post("/signup", userControllerInstance.signup.bind(userControllerInstance));
router.post("/login", userControllerInstance.login.bind(userControllerInstance));
exports.default = router;

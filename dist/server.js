"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./Router/userRoute"));
const productRoute_1 = __importDefault(require("./Router/productRoute"));
const port = 5000;
const app = (0, express_1.default)();
const MONGO_URL = "mongodb://localhost:27017/PRODUCT_MANAGEMENT_APP_";
// MongoDB connection
mongoose_1.default.connect(MONGO_URL)
    .then(() => {
    console.log("MongoDB connected");
})
    .catch((error) => {
    console.error("MongoDB could not be connected:", error.message);
});
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/user", userRoute_1.default);
app.use("/product", productRoute_1.default);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log("hit");
});

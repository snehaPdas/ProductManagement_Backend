const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Router/user")
const productRoutes=require("./Router/Product")

const port = 5000;
const app = express();
const MONGO_URL = "mongodb://localhost:27017/PRODUCT_MANAGEMENT_APP_";

// MongoDB connection
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB could not be connected:", error.message);
  });

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST","DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


// Routes
app.use("/user", userRoutes)
app.use("/product",productRoutes)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log("hit");
});

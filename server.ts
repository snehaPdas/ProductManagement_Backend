import express  from "express";
import mongoose from "mongoose";
import  cors from "cors"
import  userRoute from "./Router/userRoute"
import productRoute from "./Router/productRoute"

const port = 5000;
const app = express();
const MONGO_URL = process.env.MONGODB!

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
  origin: ["http://localhost:5173",process.env.FRONT_URL!],
  methods: ["GET", "POST","DELETE","PUT"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


// Routes
app.use("/user", userRoute)
app.use("/product",productRoute)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log("hit");
});

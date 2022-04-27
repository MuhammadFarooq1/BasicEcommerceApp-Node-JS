import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ExpressValidator from "express-validator";
import MongoStore from "connect-mongo";
import session from "express-session";
import connectDB from "./backEnd/config/db.js";

// Load Config
dotenv.config({ path: "./backEnd/config/config.env" });

// import user routees
import authRoutes from "./backEnd/routes/authRoutes.js";
import userbyidRoutes from "./backEnd/routes/userbyidRoutes.js";
import categoryRoutes from "./backEnd/routes/categoryRoutes.js";
import productRoutes from "./backEnd/routes/productRoutes.js";
// import { validate } from "./backEnd/models/user.js";
// const { validate } = require("./backEnd/models/user");

// connect database
connectDB();

const app = express();
// development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//middelwares

app.use(morgan("dev"));
//app.use(validationResult());
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(ExpressValidator());

//routes

app.use(authRoutes);
app.use(userbyidRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

// intializing the port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${process.env.NODE_ENV} mode on ${PORT} `
  );
});

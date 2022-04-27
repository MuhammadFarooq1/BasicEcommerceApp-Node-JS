import express, { Router } from "express";
const router = express.Router();

import {
  creatProduct,
  productById,
  readProduct,
  removeProduct,
  updateProduct,
  listOfProducts,
  listOfRelatedProducts,
  listOfcategories,
  productListBySearch,
  fetchPhoto,
  listOfSearchedProduct,
} from "../controllers/productController.js";
import { userById } from "../controllers/userByIdcontroller.js";
import { isAdmin, isAuth } from "../controllers/authcontroller.js";

router.get("/product/:productId", readProduct);
router.get("/products/search", listOfSearchedProduct);
router.post("/product/create/:userId", isAdmin, creatProduct);
router.delete("/product/:productId/:userId", isAdmin, removeProduct);
router.put("/product/:productId/:userId", isAdmin, updateProduct);
router.get("/products", listOfProducts);
router.get("/products/relatedProducts/:productId", listOfRelatedProducts);
router.get("/products/categories", listOfcategories);
router.post("/products/by/search", productListBySearch);
router.get("/product/photo/:productId", fetchPhoto);

router.param("userId", userById);
router.param("productId", productById);

export default router;

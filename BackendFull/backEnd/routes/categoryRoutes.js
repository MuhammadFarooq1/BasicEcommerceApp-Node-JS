import express from "express";
const router = express.Router();

import {
  creatCategory,
  categoryById,
  readCategory,
  updateCategory,
  deleteCategory,
  listOfCategory,
} from "../controllers/categoryController.js";
import { userById } from "../controllers/userByIdcontroller.js";
import { isAdmin, isAuth } from "../controllers/authcontroller.js";

router.get("/category/:categoryId", readCategory);
router.post("/category/create/:userId", isAdmin, creatCategory);
router.put("/category/:categoryId/:userId", isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isAdmin, deleteCategory);
router.get("/categories", listOfCategory);

router.param("/categoryId", categoryById);
router.param("userId", userById);

export default router;

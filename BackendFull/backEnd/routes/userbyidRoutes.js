import express from "express";
const router = express.Router();

import {
  userById,
  readUserProfile,
  updateUserProfile,
} from "../controllers/userByIdcontroller.js";
import { isAdmin, isAuth } from "../controllers/authcontroller.js";

router.get("/secret/:userId", isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", readUserProfile);
router.put("/user/:userId", updateUserProfile);

router.param("userId", userById);
export default router;

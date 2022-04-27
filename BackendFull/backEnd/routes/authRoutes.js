import express from "express";
const router = express.Router();

import { signUp, signIn, signOut } from "../controllers/authcontroller.js";
import { userSignUpValidator } from "../validator/indexvalidator.js";

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signout", signOut);

router.get("/hello", (req, res) => {
  res.send("hello there");
});

export default router;

import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller";
const router = express();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.profile("/me", getProfile);

export default router;

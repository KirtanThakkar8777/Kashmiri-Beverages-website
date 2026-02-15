import express from "express";
import { Login, Signup, Logout } from "../controllers/auth.controller.js";



const router = express.Router();

router.post("/signup", Signup);
router.post("/Login", Login);
router.post("/logout", Logout);



export default router;
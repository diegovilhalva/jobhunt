import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"


const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.patch("/profile/update", isAuthenticated, updateProfile)
router.post("/logout", isAuthenticated, logout)


export default router
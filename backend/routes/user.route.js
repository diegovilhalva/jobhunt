import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload, multiUpload } from "../middlewares/multer.js"


const router = express.Router()


router.post("/register", singleUpload, register)
router.post("/login", login)
router.patch("/profile/update", isAuthenticated,multiUpload, updateProfile)
router.post("/logout", isAuthenticated, logout)


export default router
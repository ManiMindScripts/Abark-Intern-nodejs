import express from "express"
import { register, login } from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const router = express.Router()

router.post("/register",
    authMiddleware,
    roleMiddleware("ADMIN"),
    register)
router.post("/login", login)

export default router
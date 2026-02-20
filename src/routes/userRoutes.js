import express from "express"
import * as userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"
import { upload } from "../config/multer.js"


const router = express.Router()
router.use(authMiddleware)

router.get("/",userController.getAllUsers)
router.patch("/:id/upload",authMiddleware,upload.single("profileImage"),userController.uploadProfileiImage)
router.get("/:id",userController.getUserById)
router.delete("/:id",
    roleMiddleware("ADMIN"),
    userController.deleteUser)

export default router
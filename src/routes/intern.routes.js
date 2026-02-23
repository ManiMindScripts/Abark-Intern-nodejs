import express from "express";
import  authMiddleware  from "../middlewares/authMiddleware.js";
import  roleMiddleware  from "../middlewares/roleMiddleware.js";
import { createIntern, getAllInterns, getInternById, deleteIntern, uploadProfileImage } from "../controllers/intern.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createIntern);
router.get("/", authMiddleware, getAllInterns);
router.get("/:id", authMiddleware, getInternById);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteIntern);
router.post("/:id/upload", authMiddleware, upload.single("profileImage"), uploadProfileImage);

export default router;
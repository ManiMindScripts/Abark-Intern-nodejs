import express from "express";
import  authMiddleware  from "../middlewares/authMiddleware.js";
import  roleMiddleware  from "../middlewares/roleMiddleware.js";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  deleteTask,
  uploadTaskAttachment,
  downloadTaskAttachment
} from "../controllers/task.controller.js";

import { upload } from "../config/multer.js";
const router = express.Router();



router.post("/", authMiddleware, roleMiddleware("ADMIN"), createTask);
router.get("/", authMiddleware, getAllTasks);
router.get("/:id", authMiddleware, getTaskById);
router.patch("/:id/status", authMiddleware, updateTaskStatus);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteTask);


router.post("/:id/attachment", authMiddleware, roleMiddleware("ADMIN"), upload.single("attachment"), uploadTaskAttachment);
router.get("/:id/attachment", authMiddleware, downloadTaskAttachment);

export default router;
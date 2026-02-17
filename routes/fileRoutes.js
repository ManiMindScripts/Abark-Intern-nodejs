import express from "express"
import {streamFile} from "../controllers/fileController.js"

const router = express.Router()
router.get("/read",streamFile)
export default router
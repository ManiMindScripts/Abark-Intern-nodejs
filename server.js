import express from "express";
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";
import userRoutes from "./src/routes/userRoutes.js"
import internRoutes from "./src/routes/intern.routes.js"
import taskRoutes from "./src/routes/task.routes.js"
import authRoutes from "./src/routes/authRoutes.js"
import errorMiddleware from "./src/middlewares/errorMiddleware.js"


dotenv.config()

const app = express()
const PORT = 3000

app.use(express.json())

const _fileName = fileURLToPath(import.meta.url)
const _dirName = path.dirname(_fileName)

app.use("/uploads", express.static(path.join(_dirName, "uploads")))

app.get("/", (req, res) => {
    res.send("Authentication API Running...")
})

app.use("/auth", authRoutes)
app.use("/interns", internRoutes);
app.use("/tasks", taskRoutes);

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
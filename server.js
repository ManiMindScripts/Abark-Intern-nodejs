import express from "express";
import dotenv from "dotenv"
import userRoutes from "./src/routes/userRoutes.js"
import authRoutes from "./src/routes/authRoutes.js"
import errorMiddleware from "./src/middlewares/errorMiddleware.js"


dotenv.config()

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/",(req,res)=> {
    res.send("Authentication API Running...")
})

app.use("/auth",authRoutes)
app.use("/users",userRoutes)

app.use(errorMiddleware)

app.listen(PORT,()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})
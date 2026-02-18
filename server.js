import express from "express";
import userRoutes from "./src/routes/userRoutes.js"
import errorMiddleware from "./src/middlewares/errorMiddleware.js"


const app = express()
const PORT = 3000

app.use(express.json())

app.use("/api/users",userRoutes)

app.get("/",(req,res)=> {
    res.send("User Api with Prisma is running...")
})

app.use(errorMiddleware)

app.listen(PORT,()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})
import express from "express";
import morgan from "morgan";
import fileRoutes from "./routes/fileRoutes.js";

const app = express()
const PORT = 3000

// Logging middleware
app.use(morgan("dev"))
//Routes
app.use("/api/files",fileRoutes)

app.get("/",(req,res)=> {
    res.send("File Streaming API is running...")
})

app.listen(PORT,()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config()
const PORT = process.env.PORT || 4000

const app = express()
// DB connection
connectDB()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// CORS config
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))

// Test route
app.get("/", (req, res) => {
    res.send("Server ok")
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`)
})

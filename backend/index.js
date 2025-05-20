import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoutes  from "./routes/user.route.js"
import companyRoutes from "./routes/company.route.js"
import jobRoutes from "./routes/job.route.js"
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

// Api routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/company",companyRoutes)
app.use("/api/v1/jobs", jobRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`)
})

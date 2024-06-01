import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import passport from "passport"
import authRoutes from "./routes/authRoutes"
import {jwtStrategy, googleStrategy} from "./config/passport"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(passport.initialize())
passport.use(jwtStrategy)
passport.use(googleStrategy)

// Routes
app.use("/auth", authRoutes)

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error(error)
  })


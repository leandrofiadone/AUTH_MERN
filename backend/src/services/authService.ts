import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!

export const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({username, password: hashedPassword})
  await user.save()
  return user
}

export const login = async (username: string, password: string) => {
  const user = await User.findOne({username})
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials")
  }
  const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "1h"})
  return {token, user}
}

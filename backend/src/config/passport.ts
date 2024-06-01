import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import dotenv from "dotenv"
import User from "../models/User"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.userId)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  }
)

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({googleId: profile.id})
      if (!user) {
        user = new User({googleId: profile.id, username: profile.displayName})
        await user.save()
      }
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }
)

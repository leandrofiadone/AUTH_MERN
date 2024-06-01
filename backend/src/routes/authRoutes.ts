import {Router} from "express"
import passport from 'passport'
import * as authController from "../controllers/authControllers"

const router = Router()

router.post("/register", authController.register)
router.post("/login", authController.login)

router.get(
  "/google",
  passport.authenticate("google", {scope: ["profile", "email"]})
)
router.get(
  "/google/callback",
  passport.authenticate("google", {session: false}),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/")
  }
)

export default router

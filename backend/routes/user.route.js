import express from "express"
import { fetchUser, Login, Logout, Register } from "../controllers/user.controller.js"

const router = express.Router()

router.post('/register', Register)

router.post('/login', Login)

router.post('/logout', Logout)

router.get('/fetch-user', fetchUser)


export default router

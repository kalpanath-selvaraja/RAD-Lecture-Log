import { Router } from "express"
import {getMyDetails, getRefreshToken, login, register} from "../controllers/auth.controller"
import {authenticate} from "../middleWares/auth";
import { generateArticelDescription } from "../services/ai.service";

const router = Router()


//public
router.post("/login", login)
router.post("/register", register)
router.post("/refresh", getRefreshToken)


//protected
router.get("/me", authenticate,getMyDetails)
router.post("/ai", generateArticelDescription)

export default router

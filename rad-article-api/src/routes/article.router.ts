import { Router } from "express"
import { upload } from "../middleWares/upload"
import { creatArticle } from "../controllers/article.controller"
import { authenticate } from "../middleWares/auth"
import { requireRole } from "../middleWares/route"
import { UserRole } from "../models/user.model"


const router = Router()

router.post("/create",authenticate , requireRole([UserRole.ADMIN, UserRole.MANAGER] ),
 upload.single("image"), creatArticle)


export default router
2
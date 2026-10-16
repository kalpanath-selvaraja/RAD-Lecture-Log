import { Router } from "express"
import { upload } from "../middleWares/upload"
import { creatArticle } from "../controllers/article.controller"
import { authenticate } from "../middleWares/auth"


const router = Router()

router.post("/create",authenticate ,  upload.single("image"), creatArticle)

export default router
2
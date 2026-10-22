import { Request , Response } from "express"
import { AuthRequest } from "../middleWares/auth"
import { UserModel } from "../models/user.model"
import { uploadImage } from "../services/storage.service"
import { ArticleModel } from "../models/article.model"
import { generateArticelDescription } from "../services/ai.service"

export const creatArticle= async (req:AuthRequest , res:Response  ) => {

    
    const {title, content, tags} = req.body

    try{
        if(!req.user){
            return res.status(404).json({message: "unauthorized"})
        }

        const userId = req.user.sub

        const user = await UserModel.findById(userId).select("-password")


        if(!user){
            return res.status(404).json({message: "User not found"})
        }


       const imageURL =  req.file? await uploadImage(req.file ,"articles") : ""

        const articel = ArticleModel.create({
            title,
            content,
            author:user.id,
            imageURL,
            tags: tags? JSON.parse(tags) :[]


        })

    }catch(err){
        console.error(err)
        res.status(500).json({
        message: "Fail to create Article",
        error: err
        })
    }


}


export const getAllArticles = async (req:Request, res:Response) => {
    try{


        const page = parseInt(req.query.page as string)|| 1
        const limit = parseInt(req.query.limit as string)|| 10

        const skip = (page - 1 ) * limit




        const artcles = await ArticleModel.find({isVisible : true})
        .populate(
            "author",
            "name email"
        )
        .sort({createAt: -1 })  // sort to desc order
        .skip(skip)
        .limit(limit)

        const total = await ArticleModel.countDocuments({isVisible: true})
        res.status(200).json({data: artcles , meta: {page, limit, total, totalpage: Math.ceil(total / limit)}})


    }catch(error){
        res.status(500).json({error: "Internal server Error"})
    }
}

export const genarteDescription = async (req: Request, res: Response) => {
    const { text }= req.body

    try {
        const result = generateArticelDescription(text)
        res.status(200).json({
            data: result
        })
    }catch (error) {
        res.status(500).json({ error: "Internal Server Error"})
    }
}
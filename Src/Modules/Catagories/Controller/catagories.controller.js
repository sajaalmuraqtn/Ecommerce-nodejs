import slugify from "slugify";

import CategoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const getCatagories=(req,res)=>{
    return res.json('catagories ......')
}
export const createCategory=async(req,res)=>{
    try {
        const name =req.body.name.toLowerCase(); 
        if (await CategoryModel.findOne({name})){
            return res.status(409).json({message:'category name already exist'});
        }
    
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/categories`
    })
    
    const category =await CategoryModel.create({name:name,slug:slugify(name),image:{secure_url,public_id}})
    return res.status(201).json({message:'success',category});
    } catch (error) {
        return res.json({error:error.stack});
    }
}
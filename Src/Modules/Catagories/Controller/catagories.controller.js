import slugify from "slugify";

import CategoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const getCatagories=async(req,res)=>{
    const categories=await CategoryModel.find();
    return res.status(201).json({message:'success',categories})
}

export const getSpecificCategory=async(req,res)=>{
    const {id}=req.params; 
    const category=await CategoryModel.findOne({_id:id});
    return res.status(200).json({message:'success',category})
}

export const getActiveCategory=async(req,res)=>{
try {
 const activeCatagories=await CategoryModel.find({status:'Active'}); 
    return res.status(200).json({message:'success',activeCatagories});
} catch (error) {
    return console.log(error.stack);
}  
}

export const createCategory=async(req,res)=>{
    try {
        const name =req.body.name.toLowerCase(); 
        if (await CategoryModel.findOne({name}).select('name')){
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

export const updateCategory=async(req,res)=>{
    try {
        const {id} =req.params; 
        const category=await CategoryModel.findById(id);
        if (!category) {
            return res.json({message:` invalid id ${id} `})
        }
     
        if (req.body.name) {
            const name =req.body.name.toLowerCase(); 
            if (await CategoryModel.findOne({name}).select('name')){
                return res.status(409).json({message:`category name '${name}' already exist`});
            }    
            category.name=name;
            category.slug=slugify(name);
        }

        if (req.file) {
            const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
                folder:`${process.env.APP_NAME}/categories`
        })
         await cloudinary.uploader.destroy(category.image.public_id);
         category.image={secure_url,public_id};
        }
        if (req.body.status) {
            category.status=req.body.status
        }
      await category.save()

    return res.status(201).json({message:'success',category});
    } catch (error) {
        return res.json({error:error.stack});
    }
}

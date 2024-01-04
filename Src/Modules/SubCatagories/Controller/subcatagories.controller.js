import slugify from "slugify";
import CategoryModel from "../../../../DB/model/category.model.js";
import SubCategoryModel from "../../../../DB/model/subcategory.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const getSubCategory=async(req,res,next)=>{
    const categoryId=req.params.id;
    const category= await CategoryModel.findById(categoryId);
    if (!category) {
        return res.status(409).json({message:`Category not found`});
    }
    const subCatagories= await SubCategoryModel.find({categoryId});
    return res.status(201).json({message:"success",subCatagories}); 
}

export const createSubCategory=async(req,res,next)=>{ 
     const {name,categoryId}=req.body;

    const SubCategoryName=await SubCategoryModel.findOne({name:name.toLowerCase()});
    if (SubCategoryName) {
        return next(new Error(`Sub Category Name "${name}" already exist`,{cause:409}));   
    }
    const category= await CategoryModel.findById(categoryId);
    if (!category) {
        return next(new Error("category not found",{cause:404}));     
    }

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/${category.name}/SubCategories`});
    
    const subCategory= await SubCategoryModel.create({name,slug:slugify(name),categoryId,image:{secure_url,public_id}})
    return res.status(201).json({message:"success",subCategory});  
}
import slugify from "slugify";
import CategoryModel from "../../../../DB/model/category.model.js";
import SubCategoryModel from "../../../../DB/model/subcategory.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import ProductModel from "../../../../DB/model/product.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const getProduct=async(req,res,next)=>{
    const products=await ProductModel.find();
    return res.status(201).json({message:'success',products});
}

export const createProduct=asyncHandler( async(req,res,next)=>{
 
    const {price,discount,categoryId,subCategoryId,description}=req.body;
    const name =req.body.name.toLowerCase(); 
    if (await ProductModel.findOne({name}).select('name')) {
        return next(new Error("product name already exist",{cause:409}));    
    }
     req.body.slug=slugify(name); 
    const checkCategory=await CategoryModel.findById(categoryId);
    if(!checkCategory){
        return next(new Error("category not found",{cause:404}));     
    }
    const checkSubCategory=await SubCategoryModel.findById(subCategoryId);
    if(!checkSubCategory){
        return next(new Error("sub category not found",{cause:404}));      
    }
     req.body.finalPrice=(price - (price*(discount||0)/100)).toFixed(2);
     const{secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APP_NAME}/product/mainImage`});
    req.body.mainImage={secure_url,public_id};
    req.body.subImages=[];
    for (const file of req.files.subImages) {
        const{secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`${process.env.APP_NAME}/product/subImages`});     
        req.body.subImages.push({secure_url,public_id});
    }
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;
    const product=await ProductModel.create(req.body);
    if (!product) {
        return next(new Error("error while creating product",{cause:400}));      
    }
    return res.status(201).json({message:'success',product}); 
})

export const getProductWithCategory=async(req,res,next)=>{
    const products=await ProductModel.find({categoryId:req.params.categoryId});
    return res.status(201).json({message:'success',products});
}
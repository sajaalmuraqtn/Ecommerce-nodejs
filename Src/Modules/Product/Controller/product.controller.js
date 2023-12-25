import slugify from "slugify";
import CategoryModel from "../../../../DB/model/category.model.js";
import SubCategoryModel from "../../../../DB/model/subcategory.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import ProductModel from "../../../../DB/model/product.model.js";

export const getProduct=async(req,res)=>{
    const products=await ProductModel.find();
    return res.status(201).json({message:'success',products});
}

export const createProduct=async(req,res)=>{
    try {
    const {price,discount,categoryId,subCategoryId}=req.body;
    const name =req.body.name.toLowerCase(); 
    if (await ProductModel.findOne({name}).select('name')) {
        return res.status(409).json({message:'product name already exist'});
    }
     req.body.slug=slugify(name); 
    const checkCategory=await CategoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:'category not found'});
    }
    const checkSubCategory=await SubCategoryModel.findById(subCategoryId);
    if(!checkSubCategory){
        return res.status(404).json({message:'sub category not found'});
    }
   
     req.body.finalPrice=price - (price*(discount||0)/100);
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
        return res.status(400).json({message:'error while creating product'});
    }
    return res.status(201).json({message:'success',product});
    } catch (error) {
        return console.log(error.stack);

    }
  
}

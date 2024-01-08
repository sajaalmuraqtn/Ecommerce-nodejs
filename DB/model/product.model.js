import mongoose, { Schema, Types, model } from "mongoose";

const ProductSchema=new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    slug:{
        type:String,
        require:true,
    },stock:{
        type:String,
        default:1 
    },price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    mainImage:{
        type:Object,
        required:true
    },
    subImages:[
     {   type:Object,
        required:true
    }  
    ],
    finalPrice:{
       type: Number,
       require:true
    },
    discount:{
        type:Number,
        default:0
    },
    number_sellers:{
        type:Number,
        default:0
    }
    ,
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    },
    categoryId:{
        type:Types.ObjectId,ref:'Category', require:true
    }
    ,    subCategoryId:{
        type:Types.ObjectId,ref:'SubCategory',require:true 
    },
    createdBy:{
        type:Types.ObjectId,ref:'User',require:true
    },
    updatedBy:{
        type:Types.ObjectId,ref:'User',require:true
    }

},{
    timestamps:true
})


const ProductModel=mongoose.models.Product || model('Product',ProductSchema);
export default ProductModel;
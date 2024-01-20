import mongoose, { Schema, Types, model } from "mongoose";

const BrandSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
    },
    image:{
        type:Object
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:Types.ObjectId,ref:'User',required:true
    },
    updatedBy:{
        type:Types.ObjectId,ref:'User',required:true
    }

},{
    timestamps:true,
})


const BrandModel=mongoose.models.Brand || model('Brand',BrandSchema);
export default BrandModel;
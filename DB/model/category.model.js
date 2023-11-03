import mongoose, { Schema, Types, model } from "mongoose";

const CategorySchema=new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    slug:{
        type:String,
        require:true,
    },
    image:{
        type:Object
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    },
    createdBy:{
        type:Types.ObjectId,ref:'User'
    },
    updatedBy:{
        type:Types.ObjectId,ref:'User'
    }

},{
    timestamps:true
})

const CategoryModel=mongoose.models.Category || model('Category',CategorySchema);
export default CategoryModel;
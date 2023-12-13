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
        type:Types.ObjectId,ref:'User',require:true
    },
    updatedBy:{
        type:Types.ObjectId,ref:'User',require:true
    }

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

CategorySchema.virtual('subCategories',{
   localField:'_id',
   foreignField:'categoryId',
    ref:'SubCategory'
});
const CategoryModel=mongoose.models.Category || model('Category',CategorySchema);
export default CategoryModel;
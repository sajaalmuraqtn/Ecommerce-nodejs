import mongoose, { Schema, Types, model } from "mongoose";
import multer from "multer";

const OrderSchema=new Schema({
    userId:{
        type:Types.ObjectId,ref:'User',required:true
    },products:[{
        productId:{type:Types.ObjectId,ref:'Product',required:true},
        quantity:{type:Number,default:1,required:true},
        unitPrice:{type:Number,required:true},
        finalPrice:{type:Number,required:true}
    }],
    finalPrice:{
        type: Number,
        required:true
     },
     address:{
        type:String,
        required:true
     },
     phoneNumber:{
        type:String,
        required:true
     },
    couponName:{
        type:String, 
     },
    paymentType:{
        type:String,
        default:'cash',
        enum:['cart','cash']
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','cancelled','confirmed','onWay','delivered']
    },
    reasonRejected:String,
    note:String
    ,
    createdBy:{
        type:Types.ObjectId,ref:'User' 
    },
    updatedBy:{
        type:Types.ObjectId,ref:'User' 
    }

},{
    timestamps:true
})


const OrderModel=mongoose.models.Order || model('Order',OrderSchema);
export default OrderModel;
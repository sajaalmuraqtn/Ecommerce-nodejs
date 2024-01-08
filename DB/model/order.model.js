import mongoose, { Schema, Types, model } from "mongoose";
import multer from "multer";

const OrderSchema=new Schema({
    userId:{
        type:Types.ObjectId,ref:'User',require:true
    },products:[{
        productId:{type:Types.ObjectId,ref:'Product',require:true},
        quantity:{type:Number,default:1,require:true},
        unitPrice:{type:Number,require:true},
        finalPrice:{}
    }],
    finalPrice:{
        type: Number,
        require:true
     },
     address:{
        type:String,
        require:true
     },
     phoneNumber:{
        type:String,
        require:true
     },
    couponId:{
        type:Types.ObjectId,ref:'Coupon'
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
        type:Types.ObjectId,ref:'User',require:true
    },
    updatedBy:{
        type:Types.ObjectId,ref:'User',require:true
    }

},{
    timestamps:true
})


const OrderModel=mongoose.models.Order || model('Order',OrderSchema);
export default OrderModel;
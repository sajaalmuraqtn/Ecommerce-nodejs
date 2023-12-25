import mongoose, { Schema, Types, model } from "mongoose";

const CartSchema=new Schema({
    userId:{
        type:Types.ObjectId,ref:'User',require:true
    },
    products:[
        {
            productId:{ type:Types.ObjectId,ref:'Product',require:true},
            quantity:{type:Number,default:1,require:true}
          
        }
    ]

},{
    timestamps:true
})


const CartModel=mongoose.models.Cart || model('Cart',CartSchema);
export default CartModel;
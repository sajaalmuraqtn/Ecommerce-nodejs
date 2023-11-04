import mongoose, { Schema, model } from "mongoose";

const UserSchema=new Schema({
    userName:{
        type:String,
        require:true,
        min:4,
        max:20
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    confirmEmail:{
        type:String,
        default:false
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    image:{
        type:Object,
        require:true,
    }
    ,
    gender:{
        type:String,
        enum:['Male','Female']
    },
    status:{
        type:String,
        enum:['Active','Inactive']
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    }

},{
    timestamps:true
})

const UserModel=mongoose.models.User || model('User',UserSchema);
export default UserModel;
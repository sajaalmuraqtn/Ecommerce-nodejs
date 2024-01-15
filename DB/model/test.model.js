import mongoose, { Schema, Types, model } from "mongoose";

const AdvertisementSchema = new Schema({
    title: {
        type: String, required: true, unique: true, trim: true
    },
    services: [{
        price: { type: Number, required: true },
        title: { type: String, required: true, }

    }],
    phoneNumber: [{
        type: String, required: true,
    }],
    address: [{
        type: String, required: true,
    }],
    socialMediaLinks: [{
        type: String, required: true,
    }],
    description: {
        type: String, required: true
    },
    mainImage: {
        type: Object, required: true
    }
    ,
    subImages: [
        {
            type: Object, required: true
        }
    ],
    finalPrice: {
        type: Number, required: true
    }, address: [{
        type: String, required: true
    }],
    status: {
        type: String, enum: ['Active', 'Inactive'], default: 'Active'
    },
    couponName: {
        type: String,
        required: true
    },
    expiredDate: {
        type: Date, required: true
    },
    note: String
    ,
    isDeleted: {
        type: Boolean, default: false
    },
    createdBy: {
        type: Types.ObjectId, ref: 'User', required: true
    },
    updatedBy: {
        type: Types.ObjectId, ref: 'User', required: true
    }


}, {
    timestamps: true
})


const ProductModel = mongoose.models.Product || model('Product', ProductSchema);
export default ProductModel;
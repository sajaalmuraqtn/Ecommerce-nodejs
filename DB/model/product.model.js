import mongoose, { Schema, Types, model } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        requiredd: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
    }, stock: {
        type: Number,
        default: 1
    }, price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainImage: {
        type: Object,
        required: true
    },
    subImages: [
        {
            type: Object,
            required: true
        }
    ],
    finalPrice: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        default: 0
    },
    number_sellers: {
        type: Number,
        default: 0
    }
    ,
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: Types.ObjectId, ref: 'Category', required: true
    }
    , subCategoryId: {
        type: Types.ObjectId, ref: 'SubCategory', required: true
    },
    createdBy: {
        type: Types.ObjectId, ref: 'User', required: true
    },
    updatedBy: {
        type: Types.ObjectId, ref: 'User', required: true
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

ProductSchema.virtual("reviews",
    {
        localField: '_id',
        foreignField: 'productId',
        ref: 'Review'
    });
const ProductModel = mongoose.models.Product || model('Product', ProductSchema);
export default ProductModel;
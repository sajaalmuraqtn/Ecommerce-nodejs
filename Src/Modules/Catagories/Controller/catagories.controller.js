import slugify from "slugify";

import CategoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import { pagination } from "../../../Services/pagination.js";
import ProductModel from "../../../../DB/model/product.model.js";

export const getCatagories = async (req, res, next) => {
    const { limit, skip } = pagination(req.query.page, req.query.limit);
    const categories = await CategoryModel.find().limit(limit).skip(skip).populate('subCategories');
    return res.status(201).json({ message: 'success', categories })
}

export const getSpecificCategory = async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryModel.findOne({ _id: id });
    if (!category) {
        return next(new Error(` category not found `, { cause: 404 }));
    }
    return res.status(200).json({ message: 'success', category })
}

export const getActiveCategory = async (req, res, next) => {
    // const page=req.query.page || 1; //the number of page
    // const limit= req.query.limit ||3; //the number of category in one page
    const { limit, skip } = pagination(req.query.page, req.query.limit)

    const activeCatagories = await CategoryModel.find({ status: 'Active' }).limit(limit).skip(skip);
    return res.status(200).json({ message: 'success', count: activeCatagories.length, activeCatagories });

}

export const createCategory = async (req, res, next) => {
    try {
        const name = req.body.name.toLowerCase();
        if (await CategoryModel.findOne({ name }).select('name')) {
            return next(new Error("category name already exist", { cause: 409 }));
        }

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APP_NAME}/categories`
        })

        const category = await CategoryModel.create({ name: name, slug: slugify(name), image: { secure_url, public_id }, createdBy: req.user._id, updatedBy: req.user._id })
        return res.status(201).json({ message: 'success', category });
    } catch (error) {
        return res.json({ error: error.stack });
    }
}

export const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
        return next(new Error(` invalid id ${id} `, { cause: 400 }));
    }

    if (req.body.name) {
        const name = req.body.name.toLowerCase();
        if (await CategoryModel.findOne({ name, _id: { $ne: category._id } }).select('name')) {
            return next(new Error(`category name '${name}' already exist`, { cause: 409 }));
        }
        category.name = name;
        category.slug = slugify(name);
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APP_NAME}/categories`
        })
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image = { secure_url, public_id };
    }
    if (req.body.status) {
        category.status = req.body.status
    }
    category.updatedBy = req.user._id;
    await category.save()

    return res.status(201).json({ message: 'success', category });

}
export const deleteCategory = async (req, res, next) => {
    const categoryId  = req.params.id;
    const category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
        return next(new Error(` invalid id ${id} `, { cause: 400 }));
    }
    await ProductModel.deleteMany({categoryId});

    return res.status(200).json({ message: 'success', category });

}
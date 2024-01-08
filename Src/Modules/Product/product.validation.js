import Joi from "joi"
import { generalFieldValidation } from "../../Middleware/validation.js"

export const createProduct= Joi.object(
    {
        name: Joi.string().min(3).max(25).required(),
        description:Joi.string().min(2).max(150000).required(),
        stock:Joi.number().integer().required(),
        price:Joi.number().positive().required(),
        discount:Joi.number().positive().min(1),
        file:Joi.object({
            mainImage:Joi.array().items(generalFieldValidation.file.required()).length(1),
            subImages:Joi.array().items(generalFieldValidation.file.required()).min(2).max(4)
        }),
        status:Joi.string().valid('Active','Inactive'),
        categoryId:Joi.string().required(),
        subCategoryId:Joi.string().required()

    }
   )


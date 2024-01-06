import Joi from "joi"
import { generalFieldValidation } from "../../Middleware/validation.js"

export const createCategory= Joi.object(
    {
        name: Joi.string().required().min(5).max(20),
        // file:generalFieldValidation.file.required()
        file:Joi.array().items(generalFieldValidation.file.required()).required()
    }
   )
export const getSpecificCategory= Joi.object(
    {
        id: Joi.string().required().min(24).max(24),

    }
   )

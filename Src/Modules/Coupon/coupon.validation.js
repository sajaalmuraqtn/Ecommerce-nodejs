import Joi from "joi"
import { generalFieldValidation } from "../../Middleware/validation.js"

export const createCoupon= Joi.object(
    {
        name: Joi.string().min(3).max(20).required(),
        amount:Joi.number().positive(),
        expiredDate:Joi.date().greater('now').required()
    }
   )
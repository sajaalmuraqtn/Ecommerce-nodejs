import { Router } from "express";
import * as ProductController from './Controller/product.controller.js'
import { auth } from "../../Middleware/auth.js";
import {  endPoint } from "./product.endpoint.js";
import fileUpload, { fileValidation } from "../../Services/multer.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import { validation } from "../../Middleware/validation.js";
import * as validators from './product.validation.js'
const router=Router()

router.get('/',asyncHandler(ProductController.getProduct));
router.get('/category/:categoryId',asyncHandler(ProductController.getProductWithCategory));
router.post('/',auth(endPoint.createProduct),fileUpload(fileValidation.image).fields([{
    name:'mainImage',maxCount:1}
    ,{name:'subImages',maxCount:4}]),validation(validators.createProduct),asyncHandler(ProductController.createProduct));

export default router;
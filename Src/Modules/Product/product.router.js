import { Router } from "express";
import * as ProductController from './Controller/product.controller.js'
import { auth } from "../../Middleware/auth.js";
import {  endPoint } from "./product.endpoint.js";
import fileUpload, { fileValidation } from "../../Services/multer.js";
import { asyncHandler } from "../../Services/errorHandling.js";
const router=Router()

router.get('/',asyncHandler(ProductController.getProduct));
router.post('/',auth(endPoint.createProduct),fileUpload(fileValidation.image).fields([{
    name:'mainImage',maxCount:1}
    ,{name:'subImages',maxCount:4}]),asyncHandler(ProductController.createProduct));

export default router;
import { Router } from "express";
import * as ProductController from './Controller/product.controller.js'
import { auth } from "../../Middleware/auth.js";
import {  endPoint } from "./product.endpoint.js";
import fileUpload, { fileValidation } from "../../Services/multer.js";
const router=Router()

router.get('/',ProductController.getProduct);
router.post('/',auth(endPoint.createProduct),fileUpload(fileValidation.image).fields([{
    name:'mainImage',maxCount:1}
    ,{name:'subImages',maxCount:4}]),ProductController.createProduct);

export default router;
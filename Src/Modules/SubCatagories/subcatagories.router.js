import { Router } from "express";
import * as SubCatagoriesController from './Controller/subcatagories.controller.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";
import { asyncHandler } from "../../Services/errorHandling.js";

const router=Router({mergeParams:true});

router.post('/create',fileUpload(fileValidation.image).single('image'),asyncHandler(SubCatagoriesController.createSubCategory))

router.get('/',asyncHandler(SubCatagoriesController.getSubCategory));
export default router;
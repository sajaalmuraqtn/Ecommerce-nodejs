import { Router } from "express";
import * as SubCatagoriesController from './Controller/subcatagories.controller.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";

const router=Router({mergeParams:true});

router.post('/create',fileUpload(fileValidation.image).single('image'),SubCatagoriesController.createSubCategory)

router.get('/',SubCatagoriesController.getSubCategory);
export default router;
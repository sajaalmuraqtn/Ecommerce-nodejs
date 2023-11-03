import { Router } from "express";
import * as CatagoriesController from './Controller/catagories.controller.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";

const router=Router();

router.get('/',CatagoriesController.getCatagories);
router.post('/create',fileUpload(fileValidation.image).single('image'),CatagoriesController.createCategory)
export default router;
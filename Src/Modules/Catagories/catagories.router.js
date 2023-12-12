import { Router } from "express";
import * as CatagoriesController from './Controller/catagories.controller.js'
import SubCatagoriesRouter from '../SubCatagories/subcatagories.router.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";
import { auth } from "../../Middleware/auth.js";

const router=Router();

router.use('/:id/subCatagories',SubCatagoriesRouter);
router.get('/',auth(),CatagoriesController.getCatagories);
router.get('/active',CatagoriesController.getActiveCategory);
router.get('/:id',CatagoriesController.getSpecificCategory);
router.post('/create',fileUpload(fileValidation.image).single('image'),CatagoriesController.createCategory)
router.put('/:id',fileUpload(fileValidation.image).single('image'),CatagoriesController.updateCategory);
export default router;

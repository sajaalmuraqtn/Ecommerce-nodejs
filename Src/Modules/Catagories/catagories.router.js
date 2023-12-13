import { Router } from "express";
import * as CatagoriesController from './Controller/catagories.controller.js'
import SubCatagoriesRouter from '../SubCatagories/subcatagories.router.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";
import { auth } from "../../Middleware/auth.js";
import { endPoint } from "./category.endpoint.js";

const router=Router();

router.use('/:id/subCatagories',SubCatagoriesRouter);
router.get('/',auth(endPoint.getall),CatagoriesController.getCatagories);
router.get('/active',CatagoriesController.getActiveCategory);
router.get('/:id',auth(endPoint.getSpecific),CatagoriesController.getSpecificCategory);
router.post('/create',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),CatagoriesController.createCategory)
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),CatagoriesController.updateCategory);
export default router;

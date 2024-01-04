import { Router } from "express";
import * as CatagoriesController from './Controller/catagories.controller.js'
import SubCatagoriesRouter from '../SubCatagories/subcatagories.router.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";
import { auth } from "../../Middleware/auth.js";
import { endPoint } from "./category.endpoint.js";
import { asyncHandler } from "../../Services/errorHandling.js";

const router=Router();

router.use('/:id/subCatagories',SubCatagoriesRouter);
router.get('/',auth(endPoint.getall),asyncHandler(CatagoriesController.getCatagories));
router.get('/active',asyncHandler(CatagoriesController.getActiveCategory));
router.get('/:id',auth(endPoint.getSpecific),asyncHandler(CatagoriesController.getSpecificCategory));
router.post('/create',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),asyncHandler(CatagoriesController.createCategory))
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),asyncHandler(CatagoriesController.updateCategory));
export default router;

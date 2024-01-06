import { Router } from "express";
import * as CatagoriesController from './Controller/catagories.controller.js'
import SubCatagoriesRouter from '../SubCatagories/subcatagories.router.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";
import { auth, roles } from "../../Middleware/auth.js";
import { endPoint } from "./category.endpoint.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as validators from "./category.validation.js";
import { validation } from "../../Middleware/validation.js";

const router=Router();

router.use('/:id/subCatagories',SubCatagoriesRouter);
router.get('/',auth(Object.values(roles)),asyncHandler(CatagoriesController.getCatagories));
router.get('/active',asyncHandler(CatagoriesController.getActiveCategory));
router.get('/:id',validation(validators.getSpecificCategory),asyncHandler(CatagoriesController.getSpecificCategory));
router.post('/create',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validators.createCategory),asyncHandler(CatagoriesController.createCategory))
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),asyncHandler(CatagoriesController.updateCategory));
export default router;

import { Router } from "express";
import * as UserController from './Controller/user.controller.js'
 import { asyncHandler } from "../../Services/errorHandling.js";
import { auth, roles } from "../../Middleware/auth.js";
import fileUpload, { fileValidation } from "../../Services/multer.js";

const router=Router({mergeParams:true});

router.get('/profile',auth(Object.values(roles)),asyncHandler(UserController.profile))
router.post('/uploadUserExcel',auth(roles.Admin),fileUpload(fileValidation.excel).single('file'),asyncHandler(UserController.uploadUserExcel))
router.get('/users',asyncHandler(UserController.printPdfUsers));
router.get('/usersExcel',auth(roles.Admin),asyncHandler(UserController.printExcelUsers));

export default router;
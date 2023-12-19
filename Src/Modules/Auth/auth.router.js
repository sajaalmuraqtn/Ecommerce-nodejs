import { Router } from "express";
import * as AuthController from './Controller/auth.controller.js'
import fileUpload, { fileValidation } from "../../Services/multer.js";
const router=Router();

router.post('/signUp',fileUpload(fileValidation.image).single('image'),AuthController.signUp);
router.post('/signIn',AuthController.signIn);
router.get('/confirmEmail/:token',AuthController.confirmEmail);
router.patch('/sendCode',AuthController.sendCode);
router.patch('/forgotPassword',AuthController.forgotPassword);





export default router;
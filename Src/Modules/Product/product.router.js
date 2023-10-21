import { Router } from "express";
import * as ProductController from './Controller/product.controller.js'
const router=Router()

router.get('/',ProductController.getProduct);

export default router;
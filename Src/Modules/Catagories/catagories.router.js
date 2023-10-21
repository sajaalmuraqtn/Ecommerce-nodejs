import { Router } from "express";
import * as CatagoriesController from './Controller/catagories.controller.js'

const router=Router();

router.get('/',CatagoriesController.getCatagories);

export default router;
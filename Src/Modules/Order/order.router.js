import { Router } from "express";
import { endPoint } from "./order.endpoint.js";
import { auth } from "../../Middleware/auth.js";
import * as OrderController from "./Controller/order.controller.js"
import { asyncHandler } from "../../Services/errorHandling.js";

const router=Router();

router.post('/',auth(endPoint.create),asyncHandler(OrderController.createOrder));
// router.get('/', OrderController.getOrder );



export default router;

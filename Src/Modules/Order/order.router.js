import { Router } from "express";
import { endPoint } from "./order.endpoint.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as OrderController from "./Controller/order.controller.js"
import { auth } from "../../Middleware/auth.js";

const router=Router();

router.post('/',auth(endPoint.create),asyncHandler(OrderController.createOrder));



export default router;

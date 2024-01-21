import { Router } from "express";
import { endPoint } from "./order.endpoint.js";
import { auth } from "../../Middleware/auth.js";
import * as OrderController from "./Controller/order.controller.js"
import { asyncHandler } from "../../Services/errorHandling.js";

const router=Router();

router.post('/',auth(endPoint.create),asyncHandler(OrderController.createOrder));
router.patch('/cancel/:orderId',auth(endPoint.cancel),asyncHandler(OrderController.cancelOrder));
router.get('/',auth(endPoint.get),asyncHandler(OrderController.getOrders));
router.patch('/changeStatus/:orderId',auth(endPoint.changeStatus),asyncHandler(OrderController.changeStatus));


 
export default router;

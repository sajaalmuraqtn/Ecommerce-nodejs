import  Router  from "express";
import * as CouponController from './Controller/coupon.controller.js'
import { asyncHandler } from "../../Services/errorHandling.js";
import { auth } from "../../Middleware/auth.js";
import { endPoint } from "./coupon.endpoint.js";
import * as validators from "./coupon.validation.js"
import { validation } from "../../Middleware/validation.js";

const router=Router();

router.post('/create',auth(endPoint.create),validation(validators.createCoupon),asyncHandler(CouponController.CreateCoupon));
router.get('/',asyncHandler(CouponController.GetAllCoupons));
router.put('/:id',auth(endPoint.update),asyncHandler(CouponController.UpdateCoupon));
router.patch('/softDelete/:id',asyncHandler(CouponController.SoftDelete));
router.delete('/hardDelete/:id',asyncHandler(CouponController.HardDelete));
router.patch('/restore/:id',asyncHandler(CouponController.Restore));


export default router;
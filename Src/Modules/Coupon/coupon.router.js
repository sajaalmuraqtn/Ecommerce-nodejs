import  Router  from "express";
import * as CouponController from './Controller/coupon.controller.js'
import { asyncHandler } from "../../Services/errorHandling.js";
const router=Router();

router.post('/create',asyncHandler(CouponController.CreateCoupon));
router.get('/',asyncHandler(CouponController.GetAllCoupons));
router.put('/:id',asyncHandler(CouponController.UpdateCoupon));
router.patch('/softDelete/:id',asyncHandler(CouponController.SoftDelete));
router.delete('/hardDelete/:id',asyncHandler(CouponController.HardDelete));
router.patch('/restore/:id',asyncHandler(CouponController.Restore));


export default router;
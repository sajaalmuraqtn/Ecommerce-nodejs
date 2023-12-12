import  Router  from "express";
import * as CouponController from './Controller/coupon.controller.js'
const router=Router();

router.post('/create',CouponController.CreateCoupon);
router.get('/',CouponController.GetAllCoupons);
router.put('/:id',CouponController.UpdateCoupon);


export default router;
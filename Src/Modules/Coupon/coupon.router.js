import  Router  from "express";
import * as CouponController from './Controller/coupon.controller.js'
const router=Router();

router.post('/create',CouponController.CreateCoupon);
router.get('/',CouponController.GetAllCoupons);
router.put('/:id',CouponController.UpdateCoupon);
router.patch('/softDelete/:id',CouponController.SoftDelete);
router.delete('/hardDelete/:id',CouponController.HardDelete);
router.patch('/restore/:id',CouponController.Restore);


export default router;
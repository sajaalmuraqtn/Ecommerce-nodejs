import CartModel from "../../../../DB/model/cart.model.js";
import CouponModel from "../../../../DB/model/coupon.model.js";

export const createOrder = async (req, res, next) => {

    const { couponName } = req.body;

    const cart = await CartModel.findOne({ userId: req.user._id });
    if (!cart) {
        return next(new Error("cart is Empty", { cause: 400 }))
    }
    req.body.products = cart.products;

    if (couponName) {
        const coupon = await CouponModel.findOne({ name: couponName.toLowerCase() });
        if (!coupon) {
            return next(new Error("coupon not found", { cause: 404 }));
        }
        const currentDate=new Date();
 
        if (coupon.expiredDate <= currentDate) {
            return next(new Error("this coupon has expired", { cause: 400 }));
            
        }
        if (coupon.usedBy.includes(req.user._id) ) {
            return next(new Error(" coupon already used", { cause: 400 }));
            
        }
        return res.status(201).json({ coupon });
    }

    return res.status(201).json({ message: 'hi order' });
}
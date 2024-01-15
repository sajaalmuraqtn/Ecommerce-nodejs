import CartModel from "../../../../DB/model/cart.model.js";
import CouponModel from "../../../../DB/model/coupon.model.js";
import OrderModel from "../../../../DB/model/order.model.js";
import ProductModel from "../../../../DB/model/product.model.js";
import UserModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const createOrder = async (req, res,next) => {

    const { couponName } = req.body;

    const cart = await CartModel.findOne({ userId: req.user._id });


    if (!cart) {
        return next(new Error("cart is Empty", { cause: 400 }))
    }
    console.log(cart.products.length);
    if (cart.products.length==0) {
        return next(new Error("cart is Empty", { cause: 400 }))
    }
    req.body.products = cart.products;
    console.log(req.body.products);

    if (couponName) {
        const coupon = await CouponModel.findOne({ name: couponName.toLowerCase() });
        if (!coupon) {
            return next(new Error("coupon not found", { cause: 404 }));
        }
        const currentDate = new Date();

        if (coupon.expiredDate <= currentDate) {
            return next(new Error("this coupon has expired", { cause: 400 }));

        }
        if (coupon.usedBy.includes(req.user._id)) {
            return next(new Error(" coupon already used", { cause: 400 }));

        }
        req.body.coupon = coupon;        
    }

    let subTotals = 0;
    let finalProductList = [];
    for (let product of req.body.products) { 
        const checkProduct = await ProductModel.findOne({
            _id: product.productId,
            stock: { $gte: product.quantity }
        })
        console.log(checkProduct);
        if (!checkProduct) {
            return next(new Error(" product quantity not available", { cause: 400 }));
        }
        product = product.toObject();
        product.name = checkProduct.name;
        product.unitPrice = checkProduct.price;
        product.discount = checkProduct.discount;
        product.finalPrice = product.quantity * checkProduct.finalPrice;

        subTotals += product.finalPrice;
        finalProductList.push(product);

    }
    const user = await UserModel.findById(req.user._id); 

    if (!req.body.address) {
        req.body.address = user.address;
    }
    if (!req.body.phoneNumber) { 
        req.body.phoneNumber = user.phoneNumber;
    } 
    const order = await OrderModel.create({
        userId: req.user._id,
        products: finalProductList,
        finalPrice: subTotals - (subTotals * (req.body.couponName?.amount || 0) / 100),
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        couponName: req.body.couponName ?? ''
    })
    if (req.body.coupon) {
        await CouponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})
    }
    for (const product of req.body.products) {
        await ProductModel.updateOne({ _id: product.productId }, { $inc: {  stock: -product.quantity } })
    }
    await CartModel.updateOne({userId:req.user._id},{
        products:[]
    })
     
    return res.status(201).json({ message: 'success',order });

    
} 
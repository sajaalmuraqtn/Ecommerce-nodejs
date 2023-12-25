import CartModel from "../../../../DB/model/cart.model.js";

export const createCart=async(req,res)=>{
    const products= req.body;
    const cart = await CartModel.findOne({userId:req.user._id});
    if (!cart) {
        const newCart=await CartModel.create({
            userId:req.user._id,
            products
        });
        return res.status(201).json({message:'success',newCart});
    }
    let matched=false;
    for (let index = 0; index < cart.products.length; index++) {
        if (cart.products[index].productId==products.productId) {
            cart.products[index].quantity=products.quantity;
            matched=true;
            break;
        }
    }
    if (!matched) {
        cart.products.push(req.body);
    }
    await cart.save();
    return res.status(201).json({message:'success',cart});

}

export const removeItem=async(req,res)=>{
    const {productId}=req.body;
   const cart=await CartModel.updateOne({userId:req.user._id},{$pull:
    {
     products:{productId}
    }})
    return res.status(201).json({message:'success',cart});
}
    
export const clearCart=async(req,res)=>{
    const cart=await CartModel.updateOne({userId:req.user._id},{products:[]})
    return res.status(200).json({message:'success',cart});
}

export const getCart=async(req,res)=>{
    const cart=await CartModel.findOne({userId:req.user._id});
    return res.status(201).json({message:'success',cart});
}



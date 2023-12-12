import CouponModel from "../../../../DB/model/coupon.model.js";

export const CreateCoupon=async(req,res)=>{
    const name=req.body.name.toLowerCase();
    const {amount}=req.body;
    if (await CouponModel.findOne({name})) {
        return res.status(409).json({message:'coupon name already exist'});
    }
    const coupon=await CouponModel.create({name,amount})
    return res.status(201).json({message:'success',coupon});
}
export const GetAllCoupons=async(req,res)=>{
    const coupons=await CouponModel.find({isDeleted:false});
    return res.status(200).json({message:'success',coupons});
}

export const UpdateCoupon=async(req,res)=>{
    try {
        const id=req.params.id;
      const coupon = await CouponModel.findById(id);

    if(!coupon){
        return res.status(404).json({message:'coupon not found'});
    }
    if(req.body.name){
        const name=req.body.name.toLowerCase();

            if (await CouponModel.findOne({name}).select('name')){
                return res.status(409).json({message:`coupon name '${req.body.name}' already exist`});
            }    
        coupon.name=name;
    }

    if(req.body.amount){
        coupon.amount=req.body.amount;
    }
    await coupon.save()
    return res.status(200).json({message:'success',coupon});
    } catch (error) {
        return res.json({error:error.stack});
    }
   
}

export const SoftDelete=async(req,res)=>{
  const id=req.params.id;
  if (! await CouponModel.findById(id)) {
    return res.status(404).json({message:'coupon not found'});
  } 

  const coupon =await CouponModel.findOneAndUpdate({_id:id,isDeleted:false},{isDeleted:true},{new:true});
  if (!coupon) {
    return res.status(400).json({message:'can not delete this coupon '});
  }
  return res.status(200).json({message:'success',coupon});
 
}

export const HardDelete=async(req,res)=>{
  const id=req.params.id;
  if (! await CouponModel.findById(id)) {
    return res.status(404).json({message:'coupon not found'});
  } 
  const coupon =await CouponModel.findOneAndDelete({_id:id,isDeleted:true},{new:true});
  if (!coupon) {
    return res.status(400).json({message:'can not delete this coupon '});
  }
  return res.status(200).json({message:'success',coupon});
}


export const Restore=async(req,res)=>{
    const id=req.params.id;
    if (! await CouponModel.findById(id)) {
      return res.status(404).json({message:'coupon not found'});
    } 
  
    const coupon =await CouponModel.findOneAndUpdate({_id:id,isDeleted:true},{isDeleted:false},{new:true});
    if (!coupon) {
      return res.status(400).json({message:'can not restore this coupon '});
    }
    return res.status(200).json({message:'success',coupon});
   
  }
import Jwt  from "jsonwebtoken";
import UserModel from "../../DB/model/user.model.js";

export const roles={
    Admin:'Admin',
    User:'User'
}
export const auth=(accessRoles=[])=>{
return async(req,res,next)=>{
    try {
         const {authorization}= req.headers;

    if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
        return res.status(400).json({message:'invalid authorization '});
    }
    
    const token= authorization.split(process.env.BEARERTOKEN)[1];
    const decoded= await Jwt.verify(token,process.env.LOGINSECRET);
    if (!decoded) {
        return res.status(400).json({message:'invalid authorization '});
    }

    const user=await UserModel.findById(decoded.id).select('userName role');
    
    if(!user){
        return res.status(404).json({message:'not registered user'});
    }
    // if (user.role=='User') {
    //     return res.status(403).json({message:'not auth user'});
    // }
    if (! accessRoles.includes(user.role)) {
        return res.status(403).json({message:'not auth user'});
    }
    req.user=user
    next()
    } catch (error) {
        return res.json({error:error.stack});
    }
   
}
}
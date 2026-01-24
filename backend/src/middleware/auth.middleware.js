import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protectRoute =  async(req,res,next) => {
    const token = req.cookies.jwt;

   try{

       if(!token){
           return res.status(400).json({message:"unauthorized access"});
       }
    
       const verifiedtoken  = jwt.verify(token,process.env.JWT_SECRET);
    
       if(!verifiedtoken){
           return res.status(400).json({message:"invalid token"});
       }
    
       const id = verifiedtoken.userId;
    
       const user = await User.findById(id);
    
       if(!user){
           return res.status(404).json({message:"user not found"});
       }
    
       req.userId = user.id;
       next();
   }catch(error){
        console.log('error in protectRoute',error.message);
        return res.status(500).json({message:"internal server error"});
   }

}
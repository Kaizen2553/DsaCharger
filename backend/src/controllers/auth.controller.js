import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

import { generateToken } from "../lib/utils.js";
export const signup = async(req,res) => {
    const {fullname,email,password} = req.body;
    try{
        
        if(!fullname || !email || (password.length<10)){
            return res.status(400).json({message:"all field are required and password should be at least 10 characters"});
        }
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:'provide a valid email'});
        }
    
        const user = await User.findOne({email});
    
        if(user){
            console.log(user._id);
            return res.status(400).json({message:"user already found"});
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
    
        const newUser  = new User({
            fullname,
            email,
            password:hashedPassword,
        });
    
        if(newUser){
            const savedUser = await newUser.save();
            generateToken(savedUser._id,res);
            res.status(201).json(savedUser);
        }else{
            res.status(400).json({message:"invalid user access"});
        }

    }catch(error){
           console.log("error in signup",error.message);
           return res.status(500).json("internal server error");      
    }    



}


export const login = async(req,res) => { 
    const {email,password} = req.body;

    try{
      
       if(!email||!password){
         return res.status(400).json("input field empty");
       }

       const user = await User.findOne({email});

       if(!user){
        return res.status(404).json({message:"user not found"});
       }

       const hashedPassword = user.password;
       
       
       //comparing input password with hashedpassword

       const match = await bcrypt.compare(password,hashedPassword);

       if(!match){
          return res.status(400).json({message:"email or password are invalid"});
       }
       
       //generating token for valid login
       generateToken(user._id,res);
       return res.status(200).json(user);



    }catch(error){
     console.log("error in login controller",error.message);
     return res.status(500).json({message:"internal server error"});
    }
}

export const logout = async(req,res) => {
    res.cookie(
        "jwt",
        "",
        {maxAge:0},
    )

    return res.status(200).json({message:"user logged out"});
}

export const deleteAccount = async(req,res) => {
     try{
        const userId = req.userId;
        if(!userId){
            return res.status(400).json({message:"login to your account"});
        }

        const user = await User.findById(userId);
        if(!user)return res.status(404).json({message:"user not found"});

        const deleteUser = await user.deleteOne();
        if(deleteUser){
            return res.status(200).json({message:"account deleted successfully"});
        }
     }catch(error){
        console.log('error in deleteAccount controller',error.message);
        return res.status(500).json({message:"internal server error"});
     }
}

export const checkMe = async(req,res) => {
     try{
        const userId = req.userId;
        if(!userId){
            return res.status(400).json({message:"login to your account"});
        }

        const user = await User.findById(userId).select("-password");
        if(!user)return res.status(404).json({message:"user not found"});

        return res.status(200).json(user);
        
     }catch(error){
        console.log('error in checkMe controller',error.message);
        return res.status(500).json({message:"internal server error"});
     }
}
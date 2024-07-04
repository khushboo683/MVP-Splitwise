import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const createUser = async(req,res)=>{
    try{
      const{ name, email, password} = req.body;
      let user = await User.findOne({email:email});
      if(user){
        res.status(400).json('User already registered.')
      }
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password,salt);
     user = new User({
        name,
        email,
        password:hash
     })
     await user.save();
     res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}
export const getProfile = async(req,res)=>{
    try{
    const{id} = req.user;
    const user = await User.findById(id);
    if(!user){
        res.status(400).json('User does not exists.')
    }
    res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}
export const updateProfile = async(req,res)=>{
    try{
      const { email, currency} = req.body;
      const{id} = req.user;
      const user = await User.findByIdAndUpdate(id,{email,currency},{new:true});
      if(!user){
        res.status(400).json('User does not exists.')
      }
      res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}

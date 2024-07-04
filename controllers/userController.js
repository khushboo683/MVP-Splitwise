import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const createUser = async(req,res)=>{
    try{
      const{ name, email, password} = req.body;
      let user = await User.findOne({email:email});
      if(user){
        res.status(400).json('User already registered.')
      }
     // hashing the password before saving it in the db for security purpose. 
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
    const{userId} = req.params;
    const user = await User.findById(userId);
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
      const{userId} = req.params;
      const user = await User.findByIdAndUpdate(userId,{email,currency},{new:true});
      if(!user){
        res.status(400).json('User does not exists.')
      }
      res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}

// Need to handle delete user logic. Here I'm assuming we just need to delete the user from the db and not caring about the user's past expense with other users.
export const deleteProfile = async(req,res)=>{
    try{
     const{userId} = req.params;
     const user = await User.findByIdAndDelete(userId);
     if(!user){
        res.status(400).json('User does not exists');
     }
     res.status(201).json('Deleted successfully');
    }catch(err){
      res.status(500).json(err);
    }
}
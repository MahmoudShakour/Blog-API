const User=require("../models/User");
const bcrypt = require("bcrypt");


const authUser= async (req,res,next)=>{
    const userFound=await User.findOne({username:req.body.username}).exec();
    if(!userFound){
        res.status(401).json({message:"username is not found"});
    }
    else{
        bcrypt.compare(req.body.password,userFound.password,(err,same)=>{
            if(same){
                req.user=userFound.toJSON();
                next();
            }
            else{
                res.status(401).json({message:"invalid username or password"});
            }
        })
    }
}

module.exports=authUser;
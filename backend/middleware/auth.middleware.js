import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async(req,res,next) =>{
    try{
        const token  = req.cookies.token;

        if(!token){
            res.status(401)({message:"Not authorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();//allow access
    }
    catch(error){
        res.status(401).json({message:"Token invalid"});
    }
};

export default protect;
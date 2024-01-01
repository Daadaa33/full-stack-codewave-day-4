
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js";


export const authenticate = (req, res, next) => {
    
    const token = req.cookies.token
    console.log("this is a token ❤", token)
    if(!token) return res.status(403).json({message : "access denied please login", token});
    
    try{
        const decoded = jwt.verify(token , JWT_SECRET)
        req.user = decoded;


next();    
    }catch(e){
      console.log(e);
    }
}
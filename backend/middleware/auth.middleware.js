import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js";

const adminAuth = (req, res, next) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
              message: "Not authorized"
            })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.Admin = verified;
        next();

    } catch(error){
        return res.status(401).json({
            message:"Token expired or invalid"
        });
    }
};

export default adminAuth;
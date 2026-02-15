import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js";

const adminAuth = (req, res, next) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            res.status(401).jason({
              message: "Not authorized"
            })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.Admin = verified;
        next();

    } catch(error){
        res.status(401).json({
            message:"Token expired or invalid"
        });
    }
};

export default adminAuth;
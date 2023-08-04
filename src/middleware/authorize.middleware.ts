import { NextFunction } from "express";
import { RequestWithUser } from "../../utils/requestWithUser";
import HttpException from "../exception/http.exception";

const authorize=async (
    req:RequestWithUser,
    res:Express.Response,
    next:NextFunction
)=>{
    try{
        const role =req.role;
        if(role!="HR"){
            throw new HttpException(403,"you are not authorized ")
        }
        next();
    }catch(error){
        next(error);
    }

}
export default authorize;
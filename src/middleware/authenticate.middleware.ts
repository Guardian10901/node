import { Request,Response,NextFunction } from "express"
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../../utils/jwtPayload.type";
import { RequestWithUser } from "../../utils/requestWithUser";
import * as dotenv from "dotenv";
import ForbiddenException from "../exception/forbidden.exception";
dotenv.config({path: "dist/.env" });


const authenticate =async(
    req:RequestWithUser,
    res:Response,
    next:NextFunction
    ) =>{

        try{
            const token =getTokenFromRequestHeader(req);
            const payload=(jsonwebtoken.verify(token,process.env.SECRET_KEY)) as jwtPayload;
            req.name=payload.name;
            req.email=payload.email;
            req.role=payload.role;


            next();
        }catch(error)
        {   throw new ForbiddenException();
            next(error);
        }
    }
    const getTokenFromRequestHeader = (req:Request) =>{
        const bearerToken = req.header("Authorization");
        const token = bearerToken?bearerToken.replace("Bearer ",""):"";
        return token
    }
    export default authenticate;
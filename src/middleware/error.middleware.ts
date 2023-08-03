
import HttpException from "../exception/http.exception";
import express from "express";

const errorMiddleware = (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        console.error(error.stack);
        if (error instanceof HttpException) {
            res.status(error.status).send(error.message)
            return;

        }
        res.status(500).send(error.message);
    }catch(err){
        next(err);
    }


}
export default errorMiddleware;
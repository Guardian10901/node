import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { Employee } from "./entity/employee.entity";

import loggerMiddleware from "./middleware/logger.middleware";
import dataSourse from "./db/postgres.db";
import employeeRouter from "./route/employee.route";
import HttpException from "./exception/http.exception";
import errorMiddleware from "./middleware/error.middleware";
import {departmentRouter }from "./route/department.route";
import { Role } from "../utils/role.enum";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees', employeeRouter);

server.use("/department", departmentRouter);


server.use(errorMiddleware);
server.get('/api/roles/',(req:express.Request,res:express.Response)=>{

    return res.status(200).json({data:Object.values(Role)});
    
});
(async () => {
    await dataSourse.initialize();
    server.listen(3000, () => {
        console.log("server is listening to 3000")
        
    });
})();



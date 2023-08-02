import "reflect-metadata";
import express from "express";
import { Employee } from "./employee";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMIddleware";
import dataSourse from "./data-sourse";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees', employeeRouter);

(async () => {
    await dataSourse.initialize();
    server.listen(3000, () => {
    console.log("server is listening to 3000")
    });
})();



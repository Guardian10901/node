import "reflect-metadata";
import express from "express";
import { Employee } from "./entity/employee.entity";

import loggerMiddleware from "./middleware/logger.middleware";
import dataSourse from "./db/postgres.db";
import employeeRouter from "./route/employee.route";


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



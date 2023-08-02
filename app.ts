import express from "express";
import { Employee } from "./employee";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMIddleware";
const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees', employeeRouter);

server.listen(3000, () => {
    console.log("server is listening to 3000")
});
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({path: "dist/.env" });

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Employee } from "../entity/employee.entity";
import Address from "../entity/address.entity";
import Department from "../entity/department.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.PORT),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Employee,Address,Department],
    logging: true,
    migrations:["dist/src/db/migrations/*.js"],
    // synchronize:true,
    namingStrategy: new SnakeNamingStrategy()
})

export default dataSource;
import { DataSource } from "typeorm";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Employee } from "../entity/employee.entity";
import Address from "../entity/address.entity";
import Department from "../entity/department.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [Employee,Address,Department],
    logging: true,
    migrations:["dist/src/db/migrations/*.js"],
    // synchronize:true,
    namingStrategy: new SnakeNamingStrategy()
})

export default dataSource;
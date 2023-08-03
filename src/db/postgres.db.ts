import { DataSource } from "typeorm";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Employee } from "../entity/employee.entity";
import Address from "../entity/address.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [Employee,Address],
    logging: true,
    migrations:["dist/src/db/migrations/*.js"],
    // synchronize:true,
    namingStrategy: new SnakeNamingStrategy()
})

export default dataSource;
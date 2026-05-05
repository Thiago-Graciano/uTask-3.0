import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Task } from "./entities/Task.js";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", 
    password: "dark1213",
    database: "utask_db", 
    synchronize: true,  
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
});
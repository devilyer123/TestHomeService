import { Sequelize } from "sequelize/dist";

const database = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'TestHomeServices',
    username: 'postgres',
    password: 'rolo123'
});

export default database;
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  host: process.env.USER_HOST,
  port: Number(process.env.USER_PORT),
  database: process.env.USER_DATABASE_NAME,
  //models: ,
  dialect: "postgres",
});

export default sequelize;

import { Sequelize } from "sequelize-typescript";

// sequelize-cli db:migrate
// npm i -g sequelize-cli
// npx sequelize-cli init
// npx sequelize-cli db:create --env development
// model:create --name UserLists --attributes name:string,introduction:string,email:string,password:string
// model:create後、idのtypeなどを変更
// db:migrate db更新 Table-Field-create

// Sequelizeを使用してdbを操作するための設定
const sequelize = new Sequelize({
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  host: process.env.USER_HOST,
  port: Number(process.env.USER_PORT),
  database: process.env.USER_DATABASE_NAME,
  //models: ,
  dialect: "postgres",
});

// models: [path.join(__dirname, "./models")],
// modelsディレクトリの絶対パスを生成
// Sequelizeはmodels_Dir内のすべてのmodel.tsを自動的に読み込み
// or
// 各model.ts で add
// sequelize.addModels([UserModel]);

export default sequelize;

import sequelize from "../../connection";
import { Model, DataTypes } from "sequelize";
// !がないと
// 初期化子がなく、コンストラクターで明確に割り当てられていません
class UserModel extends Model {
  public readonly id!: string;
  public name!: string;
  public introduction!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updateAt!: Date;
}
UserModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    introduction: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: process.env.USER_DATABASE_TABLE_NAME,
    sequelize,
  }
);

export default UserModel;

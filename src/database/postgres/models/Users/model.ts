import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AllowNull,
} from "sequelize-typescript";
import sequelize from "../../connection";
import "dotenv/config";

@Table({
  timestamps: true,
  tableName: process.env.USER_DATABASE_TABLE_NAME,
  modelName: "UserModel",
})
class UserModel extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  declare introduction: string;

  @Column({
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare password: string;

  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;
}
sequelize.addModels([UserModel]);

export default UserModel;

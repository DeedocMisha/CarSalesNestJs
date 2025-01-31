import {DataTypes} from "sequelize";
import {BelongsToMany, Column, Default, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Roles} from "./roles.model";
import {UserRoles} from "./userroles.model";

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  user_id!: Number;

  @Column(DataTypes.STRING(15))
  first_name!: string;

  @Column(DataTypes.STRING(20))
  last_name!: string;

  @Column(DataTypes.STRING(50))
  email!: string;

  @Column(DataTypes.STRING)
  password_hash!: string;


  @BelongsToMany(() => Roles, () => UserRoles) // Используем промежуточную таблицу UserrolesModel
  roles!: Roles[];
}

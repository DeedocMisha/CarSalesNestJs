import {DataTypes} from "sequelize";
import {BelongsToMany, Column, Default, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Users} from "./users.model";
import {UserRoles} from "./userroles.model";

@Table
export class Roles extends Model<Roles> {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  role_id!: number;

  @Column(DataTypes.STRING(15))
  name!: string;

  @Column(DataTypes.STRING(100))
  description!: string;


  @BelongsToMany(() => Users, () => UserRoles) // Используем промежуточную таблицу UserrolesModel ДЛЯ ОБРАЩЕНИЙ СО СТОРОНЫ РОЛЕЙ К ПОЛЬЗОВАТЕЛЮ И ЕГО СВ-М
  users!: Users[];
}
import {DataTypes} from "sequelize";
import {BelongsToMany, Column, CreatedAt, Default, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
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

  @Column(DataTypes.FLOAT)
  balance!:number;

  @Column(DataTypes.STRING(50))
  email!: string;

  @Column(DataTypes.STRING)
  password_hash!: string;

  @CreatedAt
  @Column({ field: 'created_at' }) // Соответствие названию столбца в миграции
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' }) // Соответствие названию столбца в миграции
  updatedAt!: Date;

  @BelongsToMany(() => Roles, () => UserRoles) // Используем промежуточную таблицу UserrolesModel
  roles!: Roles[];
}

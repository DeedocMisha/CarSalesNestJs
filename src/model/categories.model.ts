import {DataTypes} from "sequelize";
import {Column, Default, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class Categories extends Model<Categories> {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  category_id!: Number;

  @Column(DataTypes.STRING)
  name!: string;
}
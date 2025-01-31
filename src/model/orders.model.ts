import {Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Products} from "./products.model";
import {Users} from "./users.model";

@Table
export class Orders extends Model<Orders> {
  @PrimaryKey
  @Column(DataTypes.UUID)
  order_id!: Number;

  @ForeignKey(() => Users)
  @Column(DataTypes.UUID)
  user_id!: Number;

  @ForeignKey(() => Products)
  @Column(DataTypes.UUID)
  product_id!: Number;
}
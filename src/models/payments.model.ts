import {Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Orders} from "./orders.model";

@Table
export class Payments extends Model<Payments> {
  @PrimaryKey
  @Column(DataTypes.UUID)
  payment_id!: string;

  @ForeignKey(() => Orders)
  @Column(DataTypes.UUID)
  order_id!: string;

  @Column(DataTypes.DOUBLE)
  amount!: number;

  @Column(DataTypes.STRING(25))
  payment_method!: string;

  @Column(DataTypes.STRING(10))
  payment_status!: string;
}
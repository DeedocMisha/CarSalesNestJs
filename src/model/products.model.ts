import {DataTypes} from "sequelize";
import {Column, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Categories} from "./categories.model";

@Table
export class Products extends Model<Products> {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  product_id!: Number;

  @Column(DataTypes.STRING(15))
  name!: string;

  @Column(DataTypes.STRING)
  description!: string;

  @Column(DataTypes.DOUBLE)
  price!: number;

  @Column(DataTypes.INTEGER)
  stock_quantity!: number;

  @ForeignKey(() => Categories)
  @Column(DataTypes.UUID)
  category_id!: Number;

  @Column(DataTypes.STRING)
  image_url!: string;
}

import {DataTypes} from "sequelize";
import {Column, CreatedAt, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import {SyteRating} from "./SyteRating";


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

  @CreatedAt
  @Column({ field: 'created_at' }) // Соответствие названию столбца в миграции
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' }) // Соответствие названию столбца в миграции
  updatedAt!: Date;

  @Column(DataTypes.INTEGER)
  stock_quantity!: number;

  @ForeignKey(() => SyteRating)
  @Column(DataTypes.UUID)
  category_id!: Number;

  @Column(DataTypes.STRING)
  image_url!: string;
}

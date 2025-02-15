import {DataTypes} from "sequelize";
import {Column, CreatedAt, Default, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

@Table
export class SyteRating extends Model<SyteRating> {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  payment_id!: number;

  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  user_id!: number;

  @Column(DataTypes.INTEGER)
  rating:number;


  @Column(DataTypes.STRING)
  comment: string;

  @CreatedAt
  @Column({ field: 'created_at' }) // Соответствие названию столбца в миграции
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' }) // Соответствие названию столбца в миграции
  updatedAt!: Date;

}
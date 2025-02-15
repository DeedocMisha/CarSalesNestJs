import {Column, CreatedAt, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Products} from "./products.model";
import {Users} from "./users.model";

@Table
export class Ratings extends Model<Ratings> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    rating_id!: string;

    @ForeignKey(() => Users)
    @Column(DataTypes.INTEGER)
    user_id!: number;

    @ForeignKey(() => Products)
    @Column(DataTypes.INTEGER)
    product_id!: number;

    @Column(DataTypes.INTEGER)
    @Default(0)
    rating!: number;


    @CreatedAt
    @Column({ field: 'created_at' }) // Соответствие названию столбца в миграции
    createdAt!: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' }) // Соответствие названию столбца в миграции
    updatedAt!: Date;

    @Column(DataTypes.TEXT)
    comment!: string;
}

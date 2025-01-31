import {Column, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
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
    rating!: number;

    @Column(DataTypes.TEXT)
    comment!: string;
}

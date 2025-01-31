import {Column, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Users} from "./users.model";
import {Products} from "./products.model";

@Table
export class Favourites extends Model<Favourites> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    favourite_id!: Number;

    @ForeignKey(() => Users)
    @Column(DataTypes.INTEGER)
    user_id!: number;

    @ForeignKey(() => Products)
    @Column(DataTypes.INTEGER)
    product_id!: number;
}
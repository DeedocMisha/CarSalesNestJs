import {CreateFavouriteDto} from "./dto/CreateFavourite.dto";
import {Favourites} from "../models/favourites.model";

export class FavouriteService {
    constructor(
        private readonly  favouriteTable: typeof Favourites,
    ) {}

    async getAllFavourites() {
        try {
            return await this.favouriteTable.findAll();
        }
        catch (error) {
            return {message: "Ошибка взятие всех избранных"}
        }
    }

    async getFavouritesFromUser(userId: number) {
        try {
            await this.favouriteTable.findAll({where:{id:userId}});
        }
        catch (error) {
            return {message: "Ошибка взятия избранных"}
        }
    }

    async createFavourite(createFavouriteDto: CreateFavouriteDto) {
        try {
            await this.favouriteTable.create(createFavouriteDto);
        }
        catch (error) {
            return {message: "Ошибка добавления в избранное"}
        }
    }
}
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {FavouriteService} from "./favourite.service";
import {CreateFavouriteDto} from "./dto/CreateFavourite.dto";


@Controller('Favourites')
export class FavouritesController {
    constructor(private readonly favouriteService: FavouriteService) {}

    @Post('createFavourite')
    CreateFavourite(@Body() createFavouriteDto: CreateFavouriteDto) {
        return this.favouriteService.createFavourite(createFavouriteDto);
    }

    @Get('getFavouritesFromUser')
    GetFavouritesFromUser(@Param("userId") userId: number) {
        return this.favouriteService.getFavouritesFromUser(userId);
    }

    @Get('getAllFavourites')
    GetAllFavouritesFromUser() {
        return this.favouriteService.getAllFavourites();
    }
}
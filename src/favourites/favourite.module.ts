import {Module} from "@nestjs/common";
import {FavouritesController} from "./favourite.controller";
import {FavouriteService} from "./favourite.service";

@Module({
    controllers: [FavouritesController],
    providers: [FavouriteService],
    exports: [FavouriteModule],
})
export class FavouriteModule {}

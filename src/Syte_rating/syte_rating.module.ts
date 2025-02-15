import { Module } from '@nestjs/common';
import {SyteRatingController} from "./syte_rating.controller";
import {SyteRatingService} from "./syte_rating.servise";

@Module({
    controllers: [SyteRatingController],
    providers: [SyteRatingService],
    exports: [SyteRatingModule],
})
export class SyteRatingModule {}

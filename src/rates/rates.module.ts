import { Module } from '@nestjs/common';
import {RatesService} from "./rates.service";
import {RatesController} from "./rates.controller";

@Module({
    controllers: [RatesController],
    providers: [RatesService],
    exports: [RatesModule],
})
export class RatesModule {}

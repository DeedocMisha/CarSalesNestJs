import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RatesService} from "./rates.service";
import {PostRateDto} from "./dto/postRate.dto";


@Controller()
export class RatesController {
    constructor(private readonly productsService: RatesService) {}

    @Post('createRate')
    SendMess(postRateDto:PostRateDto) {
        return this.productsService.createRate(postRateDto);
    }

    @Post('deleteRate')
    GetRat(@Param('rating_id') rating_id:number) {
        return this.productsService.deleteRate(rating_id);
    }
}

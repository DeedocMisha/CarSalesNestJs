import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../users/JwtAuthGuard';
import {SyteRatingService} from "./syte_rating.servise";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";
import {SendMessageDto} from "./dto/Send.Message.dto";
import {ValidateUserDto} from "../users/dto/ValidateUserDto";


@Controller()
export class SyteRatingController {
    constructor(private readonly syteRatingService: SyteRatingService) {}

    @Post('sendRating')
    SendMess(@Body() sendMessageDto: SendMessageDto): any {
        return this.syteRatingService.SendMessage(sendMessageDto);
    }
    @Get('getRating')
    GetRat(): any {
        return this.syteRatingService.GetRating();
    }
}

import { Injectable } from '@nestjs/common';
import {SendMessageDto} from "./dto/Send.Message.dto";
import {SyteRating} from "../models/SyteRating";

@Injectable()
export class SyteRatingService {
    constructor(private readonly ratingsModel: typeof SyteRating) {}
//TypeOf используется для получения типа переменной или выражения

    async GetRating(){
        try {
           return await this.ratingsModel.findAll();
        }
        catch (error) {
            console.log("Ошибка получения озыва");
            const ErrorObject = {
                message: "Ошибка отправки отзыва!!!"
            }
            return ErrorObject;
        }
    };


    async SendMessage(sendMessagedto:SendMessageDto){
        try {
           return  await this.ratingsModel.create(sendMessagedto);
        }
        catch(error){
            console.log("Отзыв не отправлен");
            const ErrorObject = {
                message: "Ошибка отправки отзыва!!!"
            }
            return ErrorObject;
        }
    }
}
import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {PaymentsService} from "./payments.service";
import {PaymentDto} from "./dto/Payment.Dto";


@Controller()
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post('Pay')
    Send( @Body() paymentDto: PaymentDto) {
        return this.paymentsService.pay(paymentDto);
    }
}

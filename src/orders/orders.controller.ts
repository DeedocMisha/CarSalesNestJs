import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { SendOrderDto } from './dto/SendOrderDto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get('getOrderById')
    getOrderById(@Body() { id }: { id: number }) {
        return this.ordersService.getOrderById(id);
    }

    @Get('getAllOrders')
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }

    @Post('createOrder')
    createOrder(@Body() sendOrderDto: SendOrderDto) {
        return this.ordersService.createOrder(sendOrderDto);
    }

    @Delete('deleteOrder')
    deleteOrder(@Body() { order_id }: { order_id: number }) {
        return this.ordersService.deleteOrder(order_id);
    }
}
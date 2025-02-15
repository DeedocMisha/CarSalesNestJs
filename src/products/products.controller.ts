import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {SendProductDto} from "./dto/send.product.dto";


@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('GetProdById')
    SendMess(@Body() id:number) {
        return this.productsService.getProductById(id);
    }

    @Get('GetAllProducts')
    GetRat() {
        return this.productsService.getAllProducts();
    }

    @Post('SetProduct')
    Send( @Body() sendProductDto: SendProductDto) {
        return this.productsService.sentProducts(sendProductDto);
    }

    @Delete('DeleteProduct')
    DelFromAdmin(@Body() product_id:number) {
        return this.productsService.deleteProduct(product_id);
    }
}


import {Orders} from "../models/orders.model";
import {Products} from "../models/products.model";
import {Users} from "../models/users.model";
import {SendOrderDto} from "./dto/SendOrderDto";
import {where} from "sequelize";

export class OrdersService {
    constructor(
        private readonly ordersTable: typeof Orders,
        private readonly UsersTable: typeof Users,
        private readonly ProductsTable: typeof Products,
    ) {}
    async getProductById(id: number) {
        try {
           return  await this.ordersTable.findOne({where:{order_id: id}})
        }
        catch (error) {
            console.log("Ошибка извлечения заказа")
            const ErrMessage ={
                message:"Ошибка извлечения заказа"
            }
            return ErrMessage;
        }
    }
    //Прокинуть новый товар
    async sentProducts (sendOrderDto: SendOrderDto) {
        try {
            const user = await this.UsersTable.findOne({where:{user_id: sendOrderDto.userId}});

            const product = await this.ProductsTable.findOne({where:{product_id: sendOrderDto.productId}});

            await this.ordersTable.create({
                user_id: user.user_id,
                product_id: product.product_id,
            })
        }
        catch(error) {
            console.log("Ошибка создания заказа!!!");
            return {message:"Ошибка создания заказа!!!"};
        }
    }

    async deleteProduct(order_id: number) {
        try {
            await this.ordersTable.destroy({where:{order_id: order_id}})
        }
        catch (error){
            console.log("Ошибка удаления заказа");
            return {message:"Ошибка удаления заказа"};
        }
    }
}
import { Orders } from "../models/orders.model";
import { Users } from "../models/users.model";
import { Products } from "../models/products.model";
import { SendOrderDto } from "./dto/SendOrderDto";
import { where } from "sequelize";

export class OrdersService {
    constructor(
      private readonly ordersTable: typeof Orders,
      private readonly usersTable: typeof Users,
      private readonly productsTable: typeof Products,
    ) {}

    async getOrderById(id: number) {
        try {
            return await this.ordersTable.findOne({ where: { order_id: id } });
        } catch (error) {
            console.error("Ошибка извлечения заказа");
            return { message: "Ошибка извлечения заказа" };
        }
    }

    async getAllOrders() {
        try {
            return await this.ordersTable.findAll();
        } catch (error) {
            console.error("Ошибка получения списка заказов");
            return { message: "Ошибка получения списка заказов" };
        }
    }

    async createOrder(sendOrderDto: SendOrderDto) {
        try {
            const user = await this.usersTable.findOne({ where: { user_id: sendOrderDto.userId } });
            const product = await this.productsTable.findOne({ where: { product_id: sendOrderDto.productId } });

            if (!user || !product) {
                return { message: "Пользователь или продукт не найдены" };
            }

            return await this.ordersTable.create({
                user_id: user.user_id,
                product_id: product.product_id,
            });

        } catch (error) {
            console.error("Ошибка создания заказа", error);
            return { message: "Ошибка создания заказа" };
        }
    }


    async deleteOrder(order_id: number) {
        try {
            await this.ordersTable.destroy({ where: { order_id } });
            return { message: "Заказ успешно удален" };
        } catch (error) {
            console.error("Ошибка удаления заказа");
            return { message: "Ошибка удаления заказа" };
        }
    }
}

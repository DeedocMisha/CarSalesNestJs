
import {Orders} from "../models/orders.model";
import {Products} from "../models/products.model";
import {Users} from "../models/users.model";
import {PaymentDto} from "./dto/Payment.Dto";
import {where} from "sequelize";
import {Payments} from "../models/payments.model";

export class PaymentsService {
    constructor(
        private readonly ordersTable: typeof Orders,
        private readonly ProductsTable: typeof Products,
        private readonly PaymentsTable: typeof Payments,
        private readonly usersTable: typeof Users,
    ) {}

    async pay (paymentDto: PaymentDto) {
        try {
            const order = await this.ordersTable.findOne({where:{order_id: paymentDto.order_id}});

            const product = await this.ProductsTable.findOne({where:{product_id: paymentDto.product_id}});

            // Проверяем цену (важно!)
            if (product.price !== paymentDto.amount) {
                return { message: "Ошибка: цена продукта не совпадает!", expected_price: product.price };
            }

            // Получаем пользователя и проверяем баланс
            const user = await this.usersTable.findOne({ where: { id: order.user_id } });
            if (!user) {
                return { message: "Ошибка: пользователь не найден!" };
            }

            if (user.balance < product.price) {
                return { message: "Ошибка: недостаточно средств!" };
            }

            // Вычитаем деньги из баланса пользователя
            await this.usersTable.update(
                { balance: user.balance - product.price },
                { where: { id: user.id } }
            );

            await this.PaymentsTable.create({
                order_id: order.id,
                amount: product.price,
                payment_method: paymentDto.payment_method,
                payment_status: paymentDto.payment_status,
            })

            await this.ProductsTable.destroy({where:{product_id: product.id}});
        }
        catch(error) {
            console.log("Ошибка оплаты!!!");
            return {message:"Ошибка оплаты!!!"};
        }
    }

}
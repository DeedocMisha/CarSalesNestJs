import { Injectable } from '@nestjs/common';
import { Ratings } from '../models/ratings.model';
import { Products } from '../models/products.model';
import { PostRateDto } from './dto/postRate.dto';

@Injectable()
export class RatesService {
    constructor(
      private readonly productsTable: typeof Products,
      private readonly ratingTable: typeof Ratings,
    ) {}

    // Метод для создания отзыва
    async createRate(postRateDto: PostRateDto) {
        try {
            // Ищем продукт по его ID
            const product = await this.productsTable.findOne({
                where: { product_id: postRateDto.product_id },
            });

            if (!product) {
                return { message: 'Продукт не найден' };
            }

            // Создаём новый рейтинг и связываем его с продуктом
            const rate = await this.ratingTable.create({
                product_id: postRateDto.product_id,  // связываем с продуктом
                rating:postRateDto.gradle
            });

            return rate; // Возвращаем созданный рейтинг
        } catch (error) {
            console.log('Ошибка добавления отзыва', error);
            return { message: 'Ошибка добавления отзыва' };
        }
    }

    // Метод для удаления отзыва
    async deleteRate(rating_id: number) {
        try {
            // Ищем рейтинг по его ID
            const rate = await this.ratingTable.findOne({
                where: { rating_id },
            });

            if (!rate) {
                return { message: 'Отзыв не найден' };
            }

            // Удаляем отзыв
            await rate.destroy();
            return { message: 'Отзыв удалён' };
        } catch (error) {
            console.log('Ошибка удаления отзыва', error);
            return { message: 'Ошибка удаления отзыва' };
        }
    }
}

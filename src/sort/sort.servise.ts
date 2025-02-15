import { Injectable } from '@nestjs/common';
import { Products } from '../models/products.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ratings } from '../models/ratings.model';
import { SortDto } from './dto/sort.dto';

@Injectable()
export class SortService {
  constructor(
    @InjectRepository(Products)
    private readonly productTable: Repository<Products>,
    @InjectRepository(Ratings)
    private readonly ratingTable: Repository<Ratings>,
  ) {}

  async GetSort(query:SortDto) {
    const queryBuilder = this.productTable.createQueryBuilder('product');
    // Если нужно соединить таблицы, например для рейтингов:
    queryBuilder.leftJoinAndSelect('product.ratings', 'rating');

    const {
      fuelType,
      V,
      speed,
      path,
      owner,
      price,
      rating,
      name,
    } = query;

    try {
      // Фильтрация по типу топлива
      if (fuelType) {
        if (fuelType === 'бензин') {
          queryBuilder.andWhere('product.fuel_volume = :fuelType', { fuelType: 'Бензин' });
        } else if (fuelType === 'газ') {
          queryBuilder.andWhere('product.fuel_volume = :fuelType', { fuelType: 'Газ' });
        }
      }

      // Фильтрация по объему топлива
      if (V) {
        if (V === 'менее 500 л') {
          queryBuilder.andWhere('product.fuel_volume < 500');
        } else if (V === 'более 500 л') {
          queryBuilder.andWhere('product.fuel_volume > 500');
        }
      }

      // Фильтрация по скорости
      if (speed) {
        if (speed === 'Больше 150км/ч') {
          queryBuilder.andWhere('product.speed > 150');
        } else if (speed === 'Меньше 150км/ч') {
          queryBuilder.andWhere('product.speed < 150');
        }
      }

      // Фильтрация по пути
      if (path) {
        if (path === 'Больше 150км') {
          queryBuilder.andWhere('product.mileage > 150');
        } else if (path === 'Меньше 150км') {
          queryBuilder.andWhere('product.mileage < 150');
        }
      }

      // Фильтрация по количеству владельцев
      if (owner) {
        if (owner === '1') {
          queryBuilder.andWhere('product.owner_count = :owner', { owner: 1 });
        } else if (owner === '2') {
          queryBuilder.andWhere('product.owner_count = :owner', { owner: 2 });
        }
      }

      // Фильтрация по цене
      if (price) {
        if (price === 'менее 500 тр') {
          queryBuilder.andWhere('product.price < 500000');
        } else if (price === 'более 500 тр') {
          queryBuilder.andWhere('product.price > 500000');
        }
      }

      // Фильтрация по рейтингу
      if (rating) {
        queryBuilder.andWhere('product.rating = :rating', { rating });
      }

      // Фильтрация по имени
      if (name) {
        queryBuilder.andWhere('product.name LIKE :name', { name: `%${name}%` });
      }

      // Выполнение запроса и возврат данных
      const products = await queryBuilder.getMany();

      return products;
    } catch (error) {
      return {
        message: 'Ошибка сортировки!!!',
        error: error.message,
      };
    }
  }
}

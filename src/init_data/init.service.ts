import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Roles} from "../models/roles.model";
import {Users} from "../models/users.model";
import {Products} from "../models/products.model";
import {where} from "sequelize";


@Injectable()
export class InitService implements OnModuleInit {
  async onModuleInit() {
    const [adminRole] = await Roles.findOrCreate({
      where: { name: 'admin' },
      defaults: { name: 'admin' },
    });

    const [userRole] = await Roles.findOrCreate({
      where: { name: 'user' },
      defaults: { name: 'user' },
    });

    console.log('Роли обеспечены в базе данных:', { adminRole, userRole });

    // Проверка на наличие администратора
    const adminExists = await Users.findOne({
      where: { first_name: 'adminUser' },
    });

    if (!adminExists) {
      console.log('Администратор не найден. Создание...');

      const user = await Users.create({
        first_name: 'adminUser', // Удалил лишний пробел
        password_hash: await bcrypt.hash('ADMINUSERROLES', 10),
      });

      await user.$add('roles', [adminRole.id]);

      console.log('Администратор успешно создан с ролями.');
    } else {
      console.log('Администратор уже существует.');
    }

    // Инициализация машин по умолчанию

    const cars = [{name: "Car1", description: "It is first car hello", price: 10000, image_url:"https://img.freepik.com/premium-vector/car-icon-isolated-white-background_646737-2503.jpg", fuel_type:"Benz", owner_count:3, mileage:100, speed: 100, fuel_volume:200},
      {name: "Car2", description: "It is second car hello", price: 10000, image_url:"https://img.freepik.com/premium-vector/car-icon-isolated-white-background_646737-2503.jpg", fuel_type:"Benz", owner_count:3, mileage:100, speed: 100, fuel_volume:200}];

    for (const car of cars) {
      if (!(await Products.findOne({ where: { name: car.name } }))) {
        console.log(`Product with name ${car.name} does not exist.`);
        await Products.create(car);
      } else {
        console.log(`Product with name ${car.name} exists.`);
      }
    }

    console.log('Все модели обеспечены в базе данных.');
  }
}

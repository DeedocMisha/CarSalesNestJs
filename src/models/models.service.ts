import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Roles} from "../model/roles.model";
import {Users} from "../model/users.model";


@Injectable()
export class ModelsService implements OnModuleInit {
  async onModuleInit() {
    // Убедитесь, что роли "admin" и "user" существуют
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
      where: { first_name: 'adminUser  ' }, // Удалил лишний пробел
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




    console.log('Все модели обеспечены в базе данных.');
  }
}

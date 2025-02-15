    # Запуск сервера:
```bash
Скачать все библеотеки
npm i

Запуск докера
docker run --name my-postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=passw -p 5432:5432 -d postgres

Запуск миграций
npx sequelize-cli db:migrate

Запуск сервера:
npm run start

Открытие Docker:
docker exec -it my-postgres-container psql -U postgres 
```
# Postman
Ссылка на Postman расположена в файле <>. Его необходимо просто импортировать в Postman
# Установленные библеотеки:
```bash
npm install sequelize sequelize-typescript pg pg-hstore
npm install --save-dev @types/sequelize
npm install --save-dev sequelize-cli
npx sequelize-cli db:migrate
npm install dotenv
npm i @nestjs/sequelize
npm install --save-dev @types/sequelize
npm install --save-dev @types/node
npm install --save-dev typescript
npm install pg
npm i class-validator
npm i bcrypt
npm install axios
npm install dotenv
npm i @nestjs/swagger

npm install sequelize sequelize-typescript uuid
npm install --save-dev @types/sequelize @types/uuid

```
# Установка миграций:
```bash
npm install sequelize sequelize-typescript
npm install --save-dev sequelize-cli
mkdir migrations
cd migrations
npx sequelize-cli init

config/config.json:

{
"development": {
"username": "postgres",
"password": "passw",
"database": "postgres",
"host": "127.0.0.1",
"dialect": "postgres"
},
"test": {
"username": "postgres",
"password": "passw",
"database": "postgres",
"host": "127.0.0.1",
"dialect": "postgres"
},
"production": {
"username": "postgres",
"password": "passw",
"database": "postgres",
"host": "127.0.0.1",
"dialect": "postgres"
}
}

Создать миграцию:
npx sequelize-cli migration:generate --name create-users
```
# Доп инф:
Ниже прописаны модели таблиц. В них занос данные.
<br>Кроме этого, ниже по иерархии ф-в есть скрины Swagger и моделей БД.<BR>
Спецификация Swagger находится в файле main.ts
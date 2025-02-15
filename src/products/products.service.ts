import {Products} from "../models/products.model";
import {SendProductDto} from "./dto/send.product.dto";

export class ProductsService {
    constructor(
        private readonly  productsTable: typeof Products
    ) {}
    async getAllProducts() {
        try {
            return await this.productsTable.findAll();
        }
        catch (error) {
            console.log("Ошибка извлечения всех пользователей")
            const ErrMessage ={
                message:"Ошибка извлечения всех пользователей"
            }
            return ErrMessage;
        }
    }
    //Забрать информацию о товаре по его id
    async getProductById(id: number) {
        try {
           return  await this.productsTable.findOne({where:{product_id: id}})
        }
        catch (error) {
            console.log("Ошибка извлечения пользователя")
            const ErrMessage ={
                message:"Ошибка извлечения пользователя"
            }
            return ErrMessage;
        }
    }
    //Прокинуть новый товар
    async sentProducts (sendProductDto: SendProductDto) {
        try {
            await this.productsTable.create(sendProductDto);
        }
        catch(error) {
            console.log("Ошибка создания товара!!!");
            return {message:"Ошибка создания товара!!!"};
        }
    }

    async deleteProduct(product_id: number) {
        try {
            await this.productsTable.destroy({where:{product_id: product_id}})
        }
        catch (error){
            console.log("Ошибка удаления товара");
            return {message:"Ошибка удаления товара"};
        }
    }
}
export class PaymentDto {
    order_id:number;
    product_id:number;
    payment_method:string;
    payment_status:string = "In process";
    amount:number;
}
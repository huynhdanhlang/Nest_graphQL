import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private static products = [
    { id: 1, name: 'Milk', price: 2.5 },
    { id: 2, name: 'Apples', price: 1.25 },
    { id: 3, name: 'Eggs', price: 0.99 },
  ];

  public calculateTotal(params: { product_id: number; quantity: number }): number {
    return PaymentService.products.find((it) => it.id == params.product_id).price * params.quantity;
  }

  public processPayment(params: { total: number }): boolean {
    console.log("This is where you'd call a payment processor, and charge the customer for " + params.total);
    return true;
  }
}
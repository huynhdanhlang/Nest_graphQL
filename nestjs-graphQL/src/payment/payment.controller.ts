import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

interface HasuraActionsPayload<Input extends {} = {}, Session extends {} = {}> {
  action: {
    name: string;
  };
  input: Input;
  session_variables: Session;
}

interface CreatePaymentForUserArgs {
  user_id: number;
  product_id: number;
  quantity: number;
}

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/createPaymentForUser')
  createPaymentForUser(@Body() payload: HasuraActionsPayload<{ params: CreatePaymentForUserArgs }>) {
    const total = this.paymentService.calculateTotal(payload.input.params);
    const paymentResult = this.paymentService.processPayment({ total });
    return {
      total,
      paymentResult,
      receiptNumber: 1234567,
    };
  }
}
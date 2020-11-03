import { Listener, OrderCreatedEvent, OrderData, queueGroupNames, Topics } from '@nielsendigital/ms-common';
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly topic = Topics.OrderCreated;
  queueGroupName = queueGroupNames.EXPIRATION_SERVICE;

  async onMessage(data: OrderData, msg: Message) {}
}

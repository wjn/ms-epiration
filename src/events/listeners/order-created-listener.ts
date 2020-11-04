import { Listener, OrderCreatedEvent, OrderData, queueGroupNames, Topics } from '@nielsendigital/ms-common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly topic = Topics.OrderCreated;
  queueGroupName = queueGroupNames.EXPIRATION_SERVICE;

  async onMessage(data: OrderData, msg: Message) {
    expirationQueue.add({
      orderId: data.id,
    });

    // currently there is no 15 minute delay.

    msg.ack();
  }
}

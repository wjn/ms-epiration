import {
  Listener,
  logIt,
  LogType,
  OrderCreatedEvent,
  OrderData,
  queueGroupNames,
  Topics,
} from '@nielsendigital/ms-common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly topic = Topics.OrderCreated;
  queueGroupName = queueGroupNames.EXPIRATION_SERVICE;

  async onMessage(data: OrderData, msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    logIt.out(LogType.NOTICE, `Expiration for orderId ${data.id} will occur in ${delay} miliseconds`);

    expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: delay,
      }
    );

    // currently there is no 15 minute delay.

    msg.ack();
  }
}

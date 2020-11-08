import { logIt, LogType, Topics, natsWrapper } from '@nielsendigital/ms-common';
import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher';

interface Payload {
  orderId: string;
}

// Using the NATS topics enum for the jobType param to keep conssitency
const expirationQueue = new Queue<Payload>(Topics.ExpirationComplete, {
  redis: {
    // value for redis host is found in infra/k8s/expiration-depl.yaml
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  logIt.out(LogType.STARTED, `Expiration Queue processing job for orderId: ${job.data.orderId}`);

  // publish
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };

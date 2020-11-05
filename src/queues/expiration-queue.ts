import { logIt, LogType, Topics } from '@nielsendigital/ms-common';
import Queue from 'bull';

interface Payload {
  orderId: string;
}

// Using the NATS topics enum for the jobType param to keep conssitency
const expirationQueue = new Queue<Payload>(Topics.OrderExpired, {
  redis: {
    // value for redis host is found in infra/k8s/expiration-depl.yaml
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  logIt.out(LogType.STARTED, `I want to publish an ${Topics.OrderExpired} for the orderId: ${job.data.orderId}`);
});

export { expirationQueue };

import { Topics, Publisher, ExpirationCompleteEvent } from '@nielsendigital/ms-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly topic = Topics.ExpirationComplete;
}

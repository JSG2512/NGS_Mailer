import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class ProducerService {
  constructor(private kafkaService: KafkaService) {}

  private readonly producer = this.kafkaService.producer;

  public async createMessage(topic: string, key: string, value: any) {
    return await this.producer.send({
      topic: topic,
      messages: [
        {
          key: key,
          value: this.objectToBuffer(value),
          partition: 0,
        },
      ],
    });
  }

  public objectToBuffer(payload: any): Buffer {
    return Buffer.from(JSON.stringify(payload));
  }
}

import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { KafkaClient } from './kafka.module';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('KafkaClient') public kafkaClient: KafkaClient) {}

  public consumer = this.kafkaClient.consumer;
  public producer = this.kafkaClient.producer;
  public admin = this.kafkaClient.admin;

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.admin.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
    await this.admin.disconnect();
  }
}

import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { Admin, Consumer, Kafka, KafkaConfig, Producer } from 'kafkajs';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { KafkaAdminService } from './kafka-admin.service';
import { ConfigService } from '@nestjs/config';

export interface KafkaClient {
  kafka: Kafka;
  producer: Producer;
  consumer: Consumer;
  admin: Admin;
}

@Module({
  imports: [],
  controllers: [],
  providers: [
    KafkaService,
    {
      provide: 'KafkaClient',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const kafkaConfig: KafkaConfig = {
          clientId: configService.get<string>('SERVICE_NAME'), //process.env.SERVICE_NAME,
          brokers: [configService.get<string>('KAFKA_BROKER_1')],
          ssl: true,
          sasl: {
            mechanism: 'scram-sha-512',
            username: configService.get<string>('KAFKA_SASL_USERNAME'),
            password: configService.get<string>('KAFKA_SASL_PASSWORD'),
          },
          logLevel: 5,
        };
        const kafka = new Kafka(kafkaConfig);
        const producer = kafka.producer();
        const consumer = kafka.consumer({
          groupId: configService.get<string>('SERVICE_NAME'),
        });
        const admin = kafka.admin();

        return { kafka, producer, consumer, admin };
      },
      scope: 0,
    },
    ConsumerService,
    ProducerService,
    KafkaAdminService,
  ],
  exports: [
    KafkaService,
    'KafkaClient',
    ConsumerService,
    ProducerService,
    KafkaAdminService,
  ],
})
export class KafkaModule {}

import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaAdminService {
  constructor(private kafkaService: KafkaService) {}

  public async adjustTopic(topic: string) {
    await this.kafkaService.admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: 2,
          //   replicationFactor: 1,
        },
      ],
    });
    await this.kafkaService.admin.disconnect();
  }
}

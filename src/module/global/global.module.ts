import { Global, Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';

@Global()
@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [],
  exports: [KafkaModule],
})
export class GlobalModule {}

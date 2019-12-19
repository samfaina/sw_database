import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DatabaseModule } from './database.module';

// create logger instance
const logger = new Logger('Database Main');

// create microservice options
const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.SW_DB_MICRO_HOST,
    port: process.env.SW_DB_MICRO_PORT,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    DatabaseModule,
    microserviceOptions,
  );
  await app.listen(() => logger.log('Database microservice is listening...'));
}
bootstrap();

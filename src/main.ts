import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'
import { join } from 'path';

const microserviceOptions = {
  // transport: Transport.REDIS,  <-- Change this
  transport: Transport.GRPC,  //  <-- to this
  options: {
    // url: 'redis://localhost:6379',                  <-- remove this
    package: 'app', //                                 <-- add this
    protoPath: join(__dirname, '../src/app.proto'), // <-- & this
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
   app.listen(() => {
    Logger.log("Auth Microservice running....")
   });
 
}
bootstrap();

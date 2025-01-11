import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './modules/flights/flight.module';
import { ApiKeyMiddleware } from "@/middleware/apiKey.middleware";
import { MiddlewareConsumer } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { FlightController } from './modules/flights/flight.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FlightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //set middleware for api swagger and the flight controller
    consumer.apply(ApiKeyMiddleware).forRoutes('api', FlightController);
  }
}

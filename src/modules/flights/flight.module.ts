import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { FlightController } from "./flight.controller";
import { FlightService } from "./flight.service";
import { ApiKeyMiddleware } from "@/middleware/apiKey.middleware";

@Module({
    controllers: [FlightController],
    providers: [FlightService],
    exports: [FlightService],
})

export class FlightModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApiKeyMiddleware).forRoutes(FlightController);
    }
}
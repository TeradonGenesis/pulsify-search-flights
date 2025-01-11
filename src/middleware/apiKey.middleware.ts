import { EnvConfig } from "@/constants/config";
import { NestMiddleware } from "@nestjs/common";
import { responseEncoding } from "axios";
import { NextFunction } from "express";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

//do an api key middleware to verify the key is valid
export class ApiKeyMiddleware implements NestMiddleware {
    use(req: Request, res: responseEncoding, next: NextFunction) {
        const apiKey = req.headers['x-api-key'];
        const config = EnvConfig;

        if (!apiKey || apiKey !== config.apiKey) {
            throw new HttpException({
                code: HttpStatus.UNAUTHORIZED,
                desc: "API Key is invalid"
            }, HttpStatus.UNAUTHORIZED);
        }

        next();
    }
}
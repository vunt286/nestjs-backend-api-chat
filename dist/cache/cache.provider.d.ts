import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
declare const redisProvider: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Redis;
};
declare const memcacheProvider: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Redis;
};
export { redisProvider, memcacheProvider };

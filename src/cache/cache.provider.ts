import { ConfigService } from "@nestjs/config";
import { log } from "console";
import Redis from "ioredis";

const redisProvider = {
    provide: 'REDIS_INSTANCE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get('redis');
        const client = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            db: 0
        });
        

        client.on('connect', () => log('redis connected'));
        client.on('error', (error) => log('redis connect error', error));

        return client;
    }
}


const memcacheProvider = {
    provide: 'MEMCACHE_INSTANCE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get('redis');
        const client = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            db: 0
        });

        client.on('connect', () => log('redis connected'));
        client.on('error', (error) => log('redis connect error', error));

        return client;
    }
}

export {redisProvider, memcacheProvider}
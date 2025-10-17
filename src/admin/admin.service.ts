import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AdminService implements OnModuleInit, OnModuleDestroy {
    private redisClient2: Redis;
    constructor(@Inject('REDIS_INSTANCE') private readonly redis: Redis) {
        this.redisClient2 = new Redis(redis.options);
    }

    async onModuleInit() {
        await this.redisClient2.subscribe('notification');
        await this.redisClient2.subscribe('notification2');
        await this.redisClient2.subscribe('notification3');
        this.redisClient2.on('message', (chanel, message) => {
            console.log("notification sub here!!!!");
        });
    }

    async onModuleDestroy() {
        await this.redisClient2.unsubscribe('notification');
        await this.redisClient2.quit();
    }
}

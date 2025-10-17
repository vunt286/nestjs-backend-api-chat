import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
export declare class AdminService implements OnModuleInit, OnModuleDestroy {
    private readonly redis;
    private redisClient2;
    constructor(redis: Redis);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}

import Redis from 'ioredis';
export declare class CacheService {
    private readonly redis;
    constructor(redis: Redis);
    setCache(key: string, value: string, ttl: number): Promise<void>;
    getCache(key: string): Promise<any>;
    deleteCache(key: string): Promise<void>;
    publish(chanel: string, message: string): Promise<void>;
}

import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
    constructor(@Inject('REDIS_INSTANCE') private readonly redis: Redis) {
    }

    async setCache(key: string, value: string, ttl: number) {
        const valueVerify = typeof value === 'string' ? value : JSON.stringify(value);
        await this.redis.set(key, valueVerify, 'EX', ttl);
    }

    async getCache(key: string) {
        try {
            const value = await this.redis.get(key);
            if (value) {
                return JSON.parse(value);
            }
            return null;
        } catch (error) {
            console.log("error get key cache: " + key, error);
            return null;
        }
    }

    async deleteCache(key: string) {
        await this.redis.del(key);
        console.log("deleted keycache:", key);
    }

    async publish(chanel: string, message: string) {
        await this.redis.publish(chanel, message);
    }
}

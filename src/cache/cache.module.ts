import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import redisConfig from 'src/config/redis.config';
import { CacheService } from './cache.service';
import { redisProvider } from './cache.provider';

@Module({
    imports: [
        ConfigModule.forFeature(redisConfig)
    ],
    providers: [
        redisProvider,
        CacheService
    ],
    exports: [CacheService, 'REDIS_INSTANCE']
})
export class CacheModule {}

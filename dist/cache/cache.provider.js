"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memcacheProvider = exports.redisProvider = void 0;
const config_1 = require("@nestjs/config");
const console_1 = require("console");
const ioredis_1 = require("ioredis");
const redisProvider = {
    provide: 'REDIS_INSTANCE',
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const redisConfig = configService.get('redis');
        const client = new ioredis_1.default({
            host: redisConfig.host,
            port: redisConfig.port,
            db: 0
        });
        client.on('connect', () => (0, console_1.log)('redis connected'));
        client.on('error', (error) => (0, console_1.log)('redis connect error', error));
        return client;
    }
};
exports.redisProvider = redisProvider;
const memcacheProvider = {
    provide: 'MEMCACHE_INSTANCE',
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const redisConfig = configService.get('redis');
        const client = new ioredis_1.default({
            host: redisConfig.host,
            port: redisConfig.port,
            db: 0
        });
        client.on('connect', () => (0, console_1.log)('redis connected'));
        client.on('error', (error) => (0, console_1.log)('redis connect error', error));
        return client;
    }
};
exports.memcacheProvider = memcacheProvider;
//# sourceMappingURL=cache.provider.js.map
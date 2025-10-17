import { NestMiddleware } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
export declare class RateLimiterMiddleware implements NestMiddleware {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    use(req: any, res: any, next: () => void): Promise<void>;
}

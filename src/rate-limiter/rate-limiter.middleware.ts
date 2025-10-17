import { Injectable, NestMiddleware } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) { }

  async use(req: any, res: any, next: () => void) {
    console.log("RateLimiterMiddleware==========");

    const key = `api-limit:${req.ip}`;
    const TimeCheck = 10;
    const MaxRequest = 3;
    const currentCount = await this.cacheService.getCache(key);

    if (currentCount > MaxRequest) {

    }

    //
    this.cacheService.setCache(key, "abc", TimeCheck);

    next();
  }
}

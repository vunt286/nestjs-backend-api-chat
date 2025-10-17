"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterMiddleware = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../cache/cache.service");
let RateLimiterMiddleware = class RateLimiterMiddleware {
    cacheService;
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async use(req, res, next) {
        console.log("RateLimiterMiddleware==========");
        const key = `api-limit:${req.ip}`;
        const TimeCheck = 10;
        const MaxRequest = 3;
        const currentCount = await this.cacheService.getCache(key);
        if (currentCount > MaxRequest) {
        }
        this.cacheService.setCache(key, "abc", TimeCheck);
        next();
    }
};
exports.RateLimiterMiddleware = RateLimiterMiddleware;
exports.RateLimiterMiddleware = RateLimiterMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService])
], RateLimiterMiddleware);
//# sourceMappingURL=rate-limiter.middleware.js.map
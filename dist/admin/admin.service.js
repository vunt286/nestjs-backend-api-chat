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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let AdminService = class AdminService {
    redis;
    redisClient2;
    constructor(redis) {
        this.redis = redis;
        this.redisClient2 = new ioredis_1.default(redis.options);
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_INSTANCE')),
    __metadata("design:paramtypes", [ioredis_1.default])
], AdminService);
//# sourceMappingURL=admin.service.js.map
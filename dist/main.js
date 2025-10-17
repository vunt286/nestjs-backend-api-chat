"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require("compression");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(compression({
        threshold: 1024 * 1024
    }));
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3001);
    console.log(`🚀 Server running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
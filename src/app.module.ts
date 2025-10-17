import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CacheModule } from './cache/cache.module';
import { AdminService } from './admin/admin.service';
import { AuthModule } from './auth/auth.module';
import { RateLimiterMiddleware } from './rate-limiter/rate-limiter.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { FileModule } from './file/file.module';
import { StreamController } from './stream/stream.controller';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './messages/chat.gateway';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),//9GukN1DP0sTuSFqd
    CacheModule,
    UserModule,
    AuthModule,
    TaskModule,
    FileModule,
    ProductModule,
    ConversationsModule,
    MessagesModule,
    FriendshipModule
  ],
  controllers: [AppController, StreamController],
  providers: [AppService, AdminService, ChatGateway],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RateLimiterMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  // } 
}

import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendship, FriendshipSchema } from './entities/friendship.entity';
import { User, UserSchema } from 'src/auth/user.schema';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friendship.name, schema: FriendshipSchema },
      { name: User.name, schema: UserSchema }, // cần nếu service inject UserModel
    ]),
    ConversationsModule
  ],
  controllers: [FriendshipController],
  providers: [FriendshipService],
})
export class FriendshipModule { }

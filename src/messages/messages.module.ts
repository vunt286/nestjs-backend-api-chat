import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { Conversation, ConversationSchema } from 'src/conversations/entities/conversation.entity';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { ChatGateway } from './chat.gateway';
import { ConversationsService } from 'src/conversations/conversations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    ConversationsModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService, ChatGateway, ConversationsService],
  exports: [MessagesService]
})
export class MessagesModule { }

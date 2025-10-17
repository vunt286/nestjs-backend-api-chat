import { Controller, Get, Post, Body, Query, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ChatGateway } from 'src/messages/chat.gateway';
import { ConversationsService } from 'src/conversations/conversations.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService,
    private readonly chatGateway: ChatGateway,
    private conversationsService: ConversationsService


  ) { }

  // Lấy toàn bộ tin nhắn của một cuộc trò chuyện
  @Get()
  async getMessages(@Query('conversationId') conversationId: string) {
    return this.messagesService.getMessages(conversationId);
  }

  // Gửi tin nhắn (nếu không dùng socket)
  @Post()
  async sendMessage(
    @Body() body: { conversationId: string; senderId: string; text: string },
  ) {
    const result: any = await this.messagesService.sendMessage(body.conversationId, body.senderId, body.text);
    this.chatGateway.sendMessageToConversation(body.conversationId, result);
    const conversation = await this.conversationsService.getConversationById(result?.conversationId);
    if (conversation) {
      console.log(conversation, "conversationconversationconversation");
    }
    return result;
  }

  @Patch('mark-as-read')
  async markAsRead(@Body() body: { conversationId: string; userId: string }) {
    return this.messagesService.updateRead(body);
  }
}

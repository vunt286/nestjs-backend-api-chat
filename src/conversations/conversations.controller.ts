import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  // Lấy danh sách các cuộc chat mà user đang tham gia
  @Get()
  async getUserConversations(@Query('userId') userId: string) {
    return this.conversationsService.getUserConversations(userId);
  }

  // Tạo hoặc tìm chat 1-1
  @Post('private')
  async findOrCreatePrivate(@Body() body: { userChat: string; userGuest: string }) {
    return this.conversationsService.findOrCreatePrivate(body.userChat, body.userGuest);
  }

  // Tạo group chat
  @Post('group')
  async createGroup(
    @Body() body: { name: string; members: string[]; creatorId: string },
  ) {
    return this.conversationsService.createGroup(body.name, body.members, body.creatorId);
  }
}

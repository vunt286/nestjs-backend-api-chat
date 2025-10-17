import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendRequestDto } from './dto/create-friendship.dto';
import { FriendRespondDto } from './dto/update-friendship.dto';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) { }
  
  @Post('request')
  sendRequest(@Body() dto: FriendRequestDto) {
    return this.friendshipService.sendFriendRequest(dto);
  }

  @Post('respond')
  respondRequest(@Body() dto: FriendRespondDto) {
    return this.friendshipService.respondFriendRequest(dto);
  }

  @Get('list')
  getFriends(@Query('userId') userId: string) {
    return this.friendshipService.getFriends(userId);
  }

  @Get('users')
  getUsersWithStatus(@Query('userId') userId: string) {
    return this.friendshipService.getUsersWithFriendStatus(userId);
  }
}

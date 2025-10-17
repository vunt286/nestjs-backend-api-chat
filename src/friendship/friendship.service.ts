import { FriendRequestDto } from './dto/create-friendship.dto';
import { FriendRespondDto } from './dto/update-friendship.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Friendship } from './entities/friendship.entity';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConversationsService } from 'src/conversations/conversations.service';


@Injectable()
export class FriendshipService {
  constructor(
    @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly conversationsService: ConversationsService
  ) { }

  async sendFriendRequest(dto: FriendRequestDto) {
    const { requesterId, recipientId } = dto;
    if (requesterId === recipientId) throw new BadRequestException("Cannot add yourself");

    const existing = await this.friendshipModel.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId },
      ],
    });
    if (existing) throw new BadRequestException("Friend request already exists");

    const friendship = await this.friendshipModel.create({
      requester: requesterId,
      recipient: recipientId,
    });
    return friendship;
  }

  async respondFriendRequest(dto: FriendRespondDto) {
    const { requesterId, recipientId, action } = dto;

    const friendship = await this.friendshipModel.findOne({
      requester: requesterId,
      recipient: recipientId,
      status: 'pending',
    });
    console.log({
      requester: requesterId,
      recipient: recipientId,
      status: 'pending',
    });
    
    if (!friendship) throw new NotFoundException("Friend request not found");

    friendship.status = action === 'accept' ? 'accepted' : 'rejected';
    await friendship.save();
    await this.conversationsService.findOrCreatePrivate(recipientId, requesterId);
    return friendship;
  }

  async getFriends(userId: string) {
    const friends = await this.friendshipModel.find({
      status: 'accepted',
      $or: [{ requester: userId }, { recipient: userId }],
    })
      .populate('requester', 'username email')
      .populate('recipient', 'username email');

    return friends.map(f => {
      const friend: any = f.requester._id.equals(userId) ? f.recipient : f.requester;
      return { _id: friend._id, username: friend.username, email: friend.email };
    });
  }

  async getUsersWithFriendStatus(userId: string) {
    const users = await this.userModel.find({ _id: { $ne: userId } });
    const friendships = await this.friendshipModel.find({
      $or: [
        { requester: userId },
        { recipient: userId },
      ]
    }).lean(); // convert thành plain object, tránh lỗi .equals()

    return users.map(u => {
      const f = friendships.find(f =>
        f.requester.toString() === u._id.toString() ||
        f.recipient.toString() === u._id.toString()
      );

      let friendStatus = 'none';
      if (f) {
        if (f.status === 'accepted') friendStatus = 'friend';
        else if (f.status === 'pending') {
          friendStatus = f.requester.toString() === userId ? 'pending' : 'request_received';
        }
      }

      return { ...u.toObject(), friendStatus };
    });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) { }

  async findOrCreatePrivate(userChat: string, userGuest: string) {
    if (!userChat || !userGuest)
      throw new BadRequestException('Missing user IDs');

    // convert string -> ObjectId (đúng user trong DB)
    const a = new Types.ObjectId(userChat);
    const b = new Types.ObjectId(userGuest);

    // kiểm tra xem đã có chưa
    let conv = await this.conversationModel.findOne({
      type: 'private',
      members: { $all: [a, b] },
    });

    // nếu chưa có => tạo mới
    if (!conv) {
      conv = await this.conversationModel.create({
        type: 'private',
        members: [a, b], // không sinh ID mới!,
        // seenBy: [new Types.ObjectId(userChat)]
      });
    }

    return conv.populate('members');
  }

  async createGroup(name: string, members: string[], creatorId: string) {
    const memberIds = members.map(id => new Types.ObjectId(id));
    const adminIds = [new Types.ObjectId(creatorId)];
    const conv = await this.conversationModel.create({
      type: 'group',
      name,
      members: memberIds,
      admins: adminIds,
    });
    return conv.populate(['members', 'admins']);
  }


  async getUserConversations(userId: string) {
    const conversations = await this.conversationModel
      .find({ members: new Types.ObjectId(userId) }) // ép kiểu ObjectId
      .populate('members', 'username email avatar')
      .populate('admins', 'username email avatar')
      .populate('lastMessage')
      .sort({ updatedAt: -1 })
      .lean();

    const result = conversations.map((conv: any) => {
      let unread = true;
      if (conv.lastMessage) {
        const seenBys: string[] = conv.lastMessage.seenBy;
        unread = seenBys.includes(userId);
      }

      console.log(conv,'==');
      
      return { ...conv, unread };
    });

    // return conversations;//result;
    return result;
  }

  async getConversationById(conversationId: string) {
    return this.conversationModel
      .findById(new Types.ObjectId(conversationId)) // ép kiểu ObjectId
      .populate('members', 'username email avatar');
  }
}

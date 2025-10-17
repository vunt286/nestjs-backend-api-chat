import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './entities/message.entity';
import { Conversation } from 'src/conversations/entities/conversation.entity';


@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Conversation.name) private convModel: Model<Conversation>,
  ) { }

  async sendMessage(conversationId: string, senderId: string, text: string) {
    const message = new this.messageModel({
      conversationId: new Types.ObjectId(conversationId),
      senderId: new Types.ObjectId(senderId),
      text,
      seenBy: [new Types.ObjectId(senderId)]
    });
    await message.save();
    await this.convModel.findByIdAndUpdate(conversationId, {
      lastMessage: message ? new Types.ObjectId(message?._id as string) : null,
      updatedAt: new Date(),
    });

    return message.populate(
      'senderId',
      'username email avatar',
    );
  }

  async getMessages(conversationId: string) {
    return this.messageModel.find({ conversationId: new Types.ObjectId(conversationId) }).populate('senderId', 'username email avatar').sort({ createdAt: 1 });
  }

  async updateRead(body: any) {
    await this.messageModel.updateMany(
      {
        conversationId: body.conversationId,
        seenBy: { $ne: body.userId },
      },
      { $push: { seenBy: body.userId } },
    );
    return { success: true };
  }
}

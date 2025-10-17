import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop()
  text: string;

  @Prop([String])
  attachments: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  seenBy: Types.ObjectId[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);

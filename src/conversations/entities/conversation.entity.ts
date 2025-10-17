import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user.schema';

@Schema({ timestamps: true })
export class Conversation extends Document {
    @Prop({ required: true, enum: ['private', 'group'] })
    type: string;

    @Prop()
    name: string;

    @Prop()
    avatar: string;

    @Prop({ type: [Types.ObjectId], ref: User.name })
    members: Types.ObjectId[];

    @Prop({ type: [Types.ObjectId], ref: User.name, default: [] })
    admins: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Message' })
    lastMessage: Types.ObjectId;

    @Prop({ type: [String], default: [] })
    seenBy: string[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

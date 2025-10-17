import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { Conversation } from 'src/conversations/entities/conversation.entity';
export declare class MessagesService {
    private messageModel;
    private convModel;
    constructor(messageModel: Model<Message>, convModel: Model<Conversation>);
    sendMessage(conversationId: string, senderId: string, text: string): Promise<Omit<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    getMessages(conversationId: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateRead(body: any): Promise<{
        success: boolean;
    }>;
}

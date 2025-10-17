import { Model } from 'mongoose';
import { Conversation } from './entities/conversation.entity';
export declare class ConversationsService {
    private conversationModel;
    constructor(conversationModel: Model<Conversation>);
    findOrCreatePrivate(userChat: string, userGuest: string): Promise<Omit<import("mongoose").Document<unknown, {}, Conversation, {}, {}> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    createGroup(name: string, members: string[], creatorId: string): Promise<Omit<import("mongoose").Document<unknown, {}, Conversation, {}, {}> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    getUserConversations(userId: string): Promise<any[]>;
    getConversationById(conversationId: string): Promise<(import("mongoose").Document<unknown, {}, Conversation, {}, {}> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}

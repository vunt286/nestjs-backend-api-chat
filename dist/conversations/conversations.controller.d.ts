import { ConversationsService } from './conversations.service';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    getUserConversations(userId: string): Promise<any[]>;
    findOrCreatePrivate(body: {
        userChat: string;
        userGuest: string;
    }): Promise<Omit<import("mongoose").Document<unknown, {}, import("./entities/conversation.entity").Conversation, {}, {}> & import("./entities/conversation.entity").Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    createGroup(body: {
        name: string;
        members: string[];
        creatorId: string;
    }): Promise<Omit<import("mongoose").Document<unknown, {}, import("./entities/conversation.entity").Conversation, {}, {}> & import("./entities/conversation.entity").Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
}

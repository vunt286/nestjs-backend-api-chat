import { MessagesService } from './messages.service';
import { ChatGateway } from 'src/messages/chat.gateway';
import { ConversationsService } from 'src/conversations/conversations.service';
export declare class MessagesController {
    private readonly messagesService;
    private readonly chatGateway;
    private conversationsService;
    constructor(messagesService: MessagesService, chatGateway: ChatGateway, conversationsService: ConversationsService);
    getMessages(conversationId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message, {}, {}> & import("./entities/message.entity").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    sendMessage(body: {
        conversationId: string;
        senderId: string;
        text: string;
    }): Promise<any>;
    markAsRead(body: {
        conversationId: string;
        userId: string;
    }): Promise<{
        success: boolean;
    }>;
}

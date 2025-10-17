import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, roomId: string): void;
    handleLeaveRoom(client: Socket, roomId: string): void;
    handleJoinUserRoom(socket: Socket, userLogin: any): void;
    sendMessageToConversation(conversationId: string, message: any): void;
    sendUpdateConversation(userId: any): void;
}

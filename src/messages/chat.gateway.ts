import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000", // cho phép ReactJS
    credentials: true,
  },
  transports: ['websocket'],
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinConversation')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() conversationId: string) {
    client.join(conversationId);
    console.log(`Client ${client.id} joinConversation ${conversationId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    client.leave(roomId);
    console.log(`Client ${client.id} left room ${roomId}`);
  }

  @SubscribeMessage('joinUserRoom')
  handleJoinUserRoom(@ConnectedSocket() socket: Socket, @MessageBody() userLogin: any) {
    const userLoginPs = JSON.parse(userLogin);
    socket.join(`room_user_${userLoginPs._id}`);
    console.log(`${socket.id} joined user room ${userLoginPs._id}`); 
  }

  sendMessageToConversation(conversationId: string, message: any) {
    // Emit tới tất cả client join room conversationId
    this.server.to(conversationId).emit('newMessage', message);
  }

  sendUpdateConversation(userId) {
    this.server.to(`room_user_${userId}`).emit('conversationUpdated', {});
  }
}

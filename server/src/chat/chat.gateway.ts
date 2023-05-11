import { Logger, Request, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { User } from 'src/users/user.entity';
import { ChatService } from './chat.service';

export type IPayload = {
  group_id: number;
  user: User;
} & CreateMessageDto;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private chatService: ChatService) {}

  logger = new Logger('ChatGateway');

  handleConnection(client: any) {
    this.logger.log(client.id);
  }

  handleDisconnect(client: any) {
    this.logger.log(client.id);
  }

  @SubscribeMessage('findAllMessages')
  findAllMessages() {
    return this.chatService.findAllMessages();
  }

  @SubscribeMessage('findAllMessagesInGroup')
  findAllMessagesInGroup(@MessageBody() group_id: number) {
    return this.chatService.findAllMessagesInGroup(group_id);
  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() payload: IPayload) {
    console.log(payload);
    const message = await this.chatService.createMessage(payload);
    this.server.emit('recieveMessage', message);
  }
}

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from '../messages/messages.service';
import { GroupsService } from '../groups/groups.service';
import { Message } from '../messages/message.entity';
import { MessageBody } from '@nestjs/websockets';
import { Logger, Param, Request } from '@nestjs/common';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { JwtService } from '@nestjs/jwt';

type IPayload = {
  group_id: number;
} & CreateMessageDto;

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server;

  private logger = new Logger('ChatGateway');

  constructor(
    private messagesService: MessagesService,
    private groupsService: GroupsService,
  ) {}

  handleConnection(client: any) {
    this.logger.log('Client connected', client.id);
  }

  handleDisconnect(client: any) {
    this.logger.log('Client disconnected', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('findAllMessages')
  async findAllMessages() {
    const messages = await this.messagesService.getMessages();
    this.server.emit('messages', messages);
  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() payload: IPayload, @Request() req: any) {
    const message = await this.messagesService.createMessage(
      { content: payload.content },
      req,
      payload.group_id,
    );

    await this.groupsService.addMessage(payload.group_id, req, message.id);

    this.server.emit('message', message);
  }
}

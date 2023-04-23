import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from '../messages/messages.service';
import { GroupsService } from '../groups/groups.service';
import { MessageBody } from '@nestjs/websockets';
import { Logger, Request } from '@nestjs/common';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { UsersService } from '../users/users.service';

type IPayload = {
  group_id: number;
  user: number;
} & CreateMessageDto;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server;

  private logger = new Logger('ChatGateway');

  constructor(
    private messagesService: MessagesService,
    private groupsService: GroupsService,
    private userssService: UsersService,
  ) {}

  handleConnection(client: any) {
    console.log('Client connected', client.id);
  }

  // handleDisconnect(client: any) {
  //   this.logger.log('Client disconnected', client.id);
  // }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }

  @SubscribeMessage('findAllMessages')
  async findAllMessages() {
    const messages = await this.messagesService.getMessages();
    this.server.emit('messages', messages);
  }

  @SubscribeMessage('findAllMessagesInGroup')
  async findAllMessagesInGroup(@MessageBody() group_id: number) {
    const group = await this.groupsService.getGroupById(group_id);
    this.server.emit('messages', group.messages);
  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() payload: IPayload, @Request() req: any) {
    const message = await this.messagesService.createMessage(
      { content: payload.content },
      req,
    );

    await this.groupsService.updateGroup(payload.group_id, req, {
      message,
      user: payload.user,
    });

    await this.userssService.updateUser(req.user.sub, {
      message: message,
    });

    this.server.emit('message', message);
  }
}

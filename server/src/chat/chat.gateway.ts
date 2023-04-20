import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { MessagesService } from '../messages/messages.service';
import { GroupsService } from '../groups/groups.service';
import { Message } from '../messages/message.entity';
import { MessageBody } from '@nestjs/websockets';
import { Param, Request } from '@nestjs/common';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    private messagesService: MessagesService,
    private groupsService: GroupsService,
  ) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('findAllMessages')
  findAllMessages(): Promise<Message[]> {
    return this.messagesService.getMessages();
  }

  @SubscribeMessage('createMessage')
  createMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @Request() req: any,
  ) {
    // return this.messagesService.createMessage(createMessageDto, req, )
  }
}

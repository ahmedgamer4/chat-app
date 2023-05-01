import { Inject, Logger, Request } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { ChatService } from './chat.service';

export type IPayload = {
  group_id: number;
  user: number;
} & CreateMessageDto;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  // logger = new Logger('ChatGateway');

  handleConnection(client: any) {
    // return this.logger.log(client.id);
    return this.chatService.findAllMessagesInGroup(1);
  }

  handleDisconnect(client: any) {
    // return this.logger.log(client.id);
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
  createMessage(@MessageBody() payload: IPayload, @Request() req: any) {
    return this.chatService.createMessage(payload, req);
  }
}

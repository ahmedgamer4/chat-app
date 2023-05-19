import { Injectable, Scope } from '@nestjs/common';
import { GroupsService } from '../groups/groups.service';
import { Message } from '../messages/message.entity';
import { MessagesService } from '../messages/messages.service';
import { IPayload } from './chat.gateway';

@Injectable({ scope: Scope.DEFAULT })
export class ChatService {
  constructor(
    private messagesService: MessagesService,
    private groupsService: GroupsService,
  ) { }

  findAllMessages(): Promise<Message[]> {
    return this.messagesService.getMessages();
  }

  async findAllMessagesInGroup(group_id: number): Promise<Message[]> {
    const group = await this.groupsService.getGroupById(group_id);
    return group.messages;
  }

  async createMessage(payload: IPayload) {
    const message = await this.messagesService.createMessage(
      { content: payload.content },
      {
        user_id: payload.user.id,
        user_photo: payload.user.photo,
        username: payload.user.name,
      },
    );

    await this.groupsService.addMessage(payload.group_id, {
      message,
    });

    console.log(message);

    return message;
  }
}

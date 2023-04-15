import { Controller, ParseIntPipe, Query } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  getMessages(
    @Query('group_id', ParseIntPipe) group_id: number,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(group_id);
  }

  createMessage(createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }
}

import { Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  getMessages(
    @Query('group_id', ParseIntPipe) group_id: number,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(group_id);
  }

  createMessage(
    @Param(':id', ParseIntPipe) id: number,
    createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.createMessage(id, createMessageDto);
  }
}

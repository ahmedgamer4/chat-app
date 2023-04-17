import {
  Body,
  Injectable,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepo: Repository<Message>,
  ) {}

  getMessages(group_id?: number): Promise<Message[]> {
    if (group_id) {
      return this.messagesRepo.find({ where: { group_id } });
    }

    return this.messagesRepo.find();
  }

  createMessage(
    @Param(':id', ParseIntPipe) id: number,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const messageToCreate: CreateMessageDto = {
      ...createMessageDto,
      date: new Date(),
    };
    const newMessage = this.messagesRepo.create();

    return this.messagesRepo.save(newMessage);
  }
}

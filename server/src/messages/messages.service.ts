import { Injectable } from '@nestjs/common';
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

  createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = this.messagesRepo.create(createMessageDto);

    return this.messagesRepo.save(newMessage);
  }
}

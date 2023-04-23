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
      return this.messagesRepo.find();
    }

    return this.messagesRepo.find();
  }

  createMessage(
    createMessageDto: CreateMessageDto,
    req: any,
  ): Promise<Message> {
    const messageToCreate = {
      ...createMessageDto,
      username: req.user.username,
      date: new Date(),
    };

    console.log(messageToCreate);

    const newMessage = this.messagesRepo.create(messageToCreate);

    return this.messagesRepo.save(newMessage);
  }
}

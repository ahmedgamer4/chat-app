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
    group_id: number,
  ): Promise<Message> {
    const messageToCreate = {
      ...createMessageDto,
      group_id,
      user_id: req.user.sub,
      username: req.user.username,
      date: new Date(),
    };

    console.log(messageToCreate);

    const newMessage = this.messagesRepo.create(messageToCreate);

    return this.messagesRepo.save(newMessage);
  }
}

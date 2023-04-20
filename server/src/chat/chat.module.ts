import { Module } from '@nestjs/common';
import { GroupsModule } from '../groups/groups.module';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../users/users.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [MessagesModule, GroupsModule, UsersModule],
  providers: [ChatGateway],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { GroupsModule } from './groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import authConfig from './config/auth.config';

@Module({
  imports: [
    UsersModule,
    MessagesModule,
    GroupsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
      envFilePath: ['.env'],
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

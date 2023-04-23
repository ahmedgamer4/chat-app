import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { CreateMessageDto } from '../../messages/dto/create-message.dto';
import { Message } from '../../messages/message.entity';

export class UpdateGroupDto {
  @ApiProperty()
  @IsOptional()
  message: Message;

  @ApiProperty()
  @IsNotEmpty()
  user: number;
}

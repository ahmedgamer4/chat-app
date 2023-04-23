import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { CreateMessageDto } from '../../messages/dto/create-message.dto';

export class UpdateGroupDto {
  @ApiProperty()
  @IsOptional()
  createMessageDto: CreateMessageDto;

  @ApiProperty()
  @IsNotEmpty()
  users: number[];
}

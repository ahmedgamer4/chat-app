import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Message } from '../../messages/message.entity';

export class UpdateGroupDto {
  @ApiProperty()
  @IsOptional()
  message?: Message;

  @ApiProperty()
  @IsOptional()
  user?: number;
}

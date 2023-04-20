import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  content: string;
}

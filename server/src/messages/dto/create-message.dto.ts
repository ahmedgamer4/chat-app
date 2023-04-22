import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  content: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, MinLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  group_id: number;

  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  date: Date;
}

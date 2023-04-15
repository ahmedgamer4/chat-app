import { MinLength } from 'class-validator';

export class CreateMessageDto {
  @MinLength(3)
  content: string;

  user_id: number;

  group_id: number;

  @MinLength(3)
  username: string;

  date: Date;
}

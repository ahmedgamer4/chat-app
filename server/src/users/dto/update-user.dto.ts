import { IsPhoneNumber, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @MinLength(3)
  name: string;

  messages: string[];

  groups: string[];

  @MinLength(5)
  bio?: string;

  @IsPhoneNumber('EG')
  phone?: string;

  photo?: string;
}

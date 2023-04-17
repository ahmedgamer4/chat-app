import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ required: false })
  messages?: string[];

  @ApiProperty({ required: false })
  groups?: string[];

  @ApiProperty({ required: false })
  @MinLength(5)
  @MaxLength(5000)
  @IsAlphanumeric()
  bio?: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber('EG')
  phone?: string;

  @ApiProperty({ required: false })
  photo?: string;
}

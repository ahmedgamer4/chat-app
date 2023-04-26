import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Message } from '../../messages/message.entity';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  @IsAlphanumeric()
  @ApiProperty({
    required: false,
  })
  name?: string;

  @IsOptional()
  @MinLength(3)
  @IsAlphanumeric()
  @ApiProperty({
    required: false,
  })
  password?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  message?: Message;

  @IsOptional()
  @ApiProperty({ required: false })
  @MinLength(5)
  @MaxLength(5000)
  @IsAlphanumeric()
  bio?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsPhoneNumber('EG')
  phone?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  photo?: string;
}

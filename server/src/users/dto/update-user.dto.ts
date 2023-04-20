import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @MinLength(3)
  @MaxLength(20)
  @IsAlphanumeric()
  @ApiProperty({
    required: false,
  })
  name?: string;

  @MinLength(3)
  @IsAlphanumeric()
  @ApiProperty({
    required: false,
  })
  password?: string;

  @ApiProperty({ required: false })
  messages?: number[];

  @ApiProperty({ required: false })
  groups?: number[];

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

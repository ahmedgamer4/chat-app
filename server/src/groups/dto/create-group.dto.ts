import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(101)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  description: string;
}

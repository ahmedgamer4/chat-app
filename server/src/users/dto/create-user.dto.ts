import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(20)
  @IsAlphanumeric()
  @ApiProperty()
  name: string;

  @IsEmail()
  @MaxLength(100)
  @ApiProperty()
  email: string;

  @MinLength(3)
  @IsAlphanumeric()
  @ApiProperty()
  password: string;

  @IsAlphanumeric()
  @ApiProperty({ required: false })
  googleId?: string;

  @IsAlphanumeric()
  @ApiProperty({ required: false })
  githubId?: string;

  @IsAlphanumeric()
  @ApiProperty({ required: false })
  facebookId?: string;
}

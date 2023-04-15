import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(3)
  password: string;

  googleId?: string;

  githubId?: string;

  facebookId?: string;
}

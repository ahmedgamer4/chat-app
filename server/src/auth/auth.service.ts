import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const userToCreate = {
      ...dto,
      passwordHash,
      messages: [],
      groups: [],
    };

    await this.userService.createUser(userToCreate);
  }

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.userService.findOne({
      email: loginDto.email,
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (isValidPassword) {
      const token = this.jwtService.sign({
        sub: user.id,
        username: user.name,
        photo: user.photo,
      });
      console.log(user.name);

      return { token, user };
    } else {
      throw new BadRequestException('Password is Incorrect');
    }
  }
}

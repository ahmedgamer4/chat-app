import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('email/register')
  @HttpCode(201)
  register(@Body() dto: AuthRegisterLoginDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('email/login')
  login(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<{ token: string; user: User }> {
    return this.authService.validateLogin(loginDto);
  }
}

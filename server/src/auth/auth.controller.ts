import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from './auth.guard';
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

  // TODO: Remove this
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getTest(@Request() req) {
    return req.user;
  }
}

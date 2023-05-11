import { User } from '../users/user.entity';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(dto: AuthRegisterLoginDto): Promise<void>;
    validateLogin(loginDto: AuthEmailLoginDto): Promise<{
        token: string;
        user: User;
    }>;
}

import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: AuthRegisterLoginDto): Promise<void>;
    login(loginDto: AuthEmailLoginDto): Promise<{
        token: string;
        user: User;
    }>;
}

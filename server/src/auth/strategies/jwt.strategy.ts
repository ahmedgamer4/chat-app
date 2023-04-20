import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

type JwtPayload = {
  sub: number;
  username: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
      // TODO: Do not forget to add ignoreExipration in production
      ignoreExipration: false,
    });
  }

  public validate(payload: JwtPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

type JwtPayload = {
  id: number;
  iat: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
      // TODO: Do not forget to add ignoreExipration in production
    });
  }

  public validate(payload: JwtPayload) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

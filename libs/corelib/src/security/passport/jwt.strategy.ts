import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface Role {
  name: string;
}

export interface JWTPayload {
  sub: string;
  roles: Role[];
}

export const JWT_SECRET_KEY = 'JWT_SECRET_KEY';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET_KEY),
    });
  }

  async validate(payload: JWTPayload) {
    //return false;
    return payload;
  }
}

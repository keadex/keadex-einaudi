import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'apiKey' });
  }

  async validate(apiKey): Promise<any> {
    const client = await this.authService.validateClient(apiKey);
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
}

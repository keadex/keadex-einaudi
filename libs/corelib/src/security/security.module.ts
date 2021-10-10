import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  providers: [JwtStrategy],
})
export class SecurityModule {}

import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { Client } from '../../models/client.model';
import { Role } from '../../models/role.model';

export interface JWTPayload {
  sub: string;
  roles: Role[];
}

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async validateClient(apiKey: string): Promise<any> {
    const client = (await this.clientService.findByApiKey(apiKey)).toObject();
    if (client) {
      return client;
    }
    return null;
  }

  async login(client: Client) {
    const payload: JWTPayload = {
      sub: client.apiKey,
      roles: client.roles.map((role) => {
        const { _id, __v, ...result } = role;
        return result;
      }),
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}

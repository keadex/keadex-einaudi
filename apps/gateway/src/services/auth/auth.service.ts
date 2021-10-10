import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { Client } from '../../models/client.model';
import { Role } from '../../models/role.model';
import { GUEST_USER_APIKEY } from '../../constants';
import { RoleType } from '@keadex/corelib';

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

  async validateClient(apiKey: string): Promise<Client | null> {
    if (apiKey === GUEST_USER_APIKEY) {
      const client: Client = {
        roles: [{ name: RoleType.GUEST }],
      };
      return client;
    }
    const client = await this.clientService.findByApiKey(apiKey);
    if (client) {
      return client.toObject() as Client;
    }
    return null;
  }

  async login(client: Client) {
    const payload: JWTPayload = {
      ...(client.apiKey != GUEST_USER_APIKEY && { sub: client.apiKey }),
      roles: client.roles.map((role) => {
        const { _id, __v, ...result } = role;
        return result;
      }),
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}

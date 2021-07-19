import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { EVENTS, SERVICES_NAMES } from '../constants';

@Controller()
export class ExperienceController {
  constructor(
    @Inject(SERVICES_NAMES.COMPANY_SERVICE) private client: ClientProxy,
  ) {}

  @EventPattern(EVENTS.EXPERIENCE_CREATED)
  async handleUserCreated(data: any) {
    console.log('Experience created');
    console.log(data);
  }
}

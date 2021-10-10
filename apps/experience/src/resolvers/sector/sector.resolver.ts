import { Roles, RoleType, JwtAuthGuard } from '@keadex/corelib';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import {
  ListSectorDto,
  CreateSectorDto,
  UpdateSectorDto,
} from '../../dto/sector.dto';
import { Sector } from '../../models/sector.model';
import { SectorService } from '../../services/sector/sector.service';

@Resolver(() => Sector)
export class SectorResolver {
  constructor(private sectorService: SectorService) {}

  @Query(() => Sector, { name: 'sector' })
  @Roles(RoleType.GUEST)
  @UseGuards(JwtAuthGuard)
  async getSector(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Sector> {
    return this.sectorService.findById(_id);
  }

  @Query(() => [Sector], { name: 'sectors' })
  @Roles(RoleType.GUEST)
  @UseGuards(JwtAuthGuard)
  async getSectors(
    @Args('filters', { nullable: true }) filters?: ListSectorDto,
  ) {
    return this.sectorService.list(filters);
  }

  @Mutation(() => Sector)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createSector(@Args('payload') payload: CreateSectorDto) {
    return this.sectorService.create(payload);
  }

  @Mutation(() => Sector)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async updateSector(@Args('payload') payload: UpdateSectorDto) {
    return this.sectorService.update(payload);
  }

  @Mutation(() => Sector)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async deleteSector(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.sectorService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Sector> {
    return this.sectorService.findById(reference._id);
  }
}

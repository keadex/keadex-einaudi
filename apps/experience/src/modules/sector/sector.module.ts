import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sector, SectorSchema } from '../../models/sector.model';
import { SectorResolver } from '../../resolvers/sector/sector.resolver';
import { SectorService } from '../../services/sector/sector.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sector.name, schema: SectorSchema }]),
  ],
  providers: [SectorService, SectorResolver],
})
export class SectorModule {}

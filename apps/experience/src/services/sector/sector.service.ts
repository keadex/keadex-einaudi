import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateSectorDto,
  ListSectorDto,
  UpdateSectorDto,
} from '../../dto/sector.dto';
import { Sector, SectorDocument } from '../../models/sector.model';

@Injectable()
export class SectorService {
  constructor(
    @InjectModel(Sector.name)
    private sectorModel: Model<SectorDocument>,
  ) {}

  create(sectorDto: CreateSectorDto): Promise<Sector> {
    const createdSector = new this.sectorModel(sectorDto);
    return createdSector.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.sectorModel.findById(_id).exec();
  }

  list(filters: ListSectorDto) {
    return this.sectorModel.find({ ...filters }).exec();
  }

  update(payload: UpdateSectorDto) {
    return this.sectorModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.sectorModel.findByIdAndDelete(_id).exec();
  }
}

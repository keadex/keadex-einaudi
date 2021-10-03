import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  CreateClientDto,
  ListClientDto,
  UpdateClientDto,
} from '../../dto/client.dto';
import { Client, ClientDocument } from '../../models/client.model';
import { generateApiKey } from '../../utils/api-key';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
  ) {}

  create(clientDto: CreateClientDto): Promise<Client> {
    const newClient = new this.clientModel(clientDto);
    newClient.apiKey = generateApiKey();
    return newClient.save();
  }

  findById(_id: MongooseSchema.Types.ObjectId) {
    return this.clientModel.findById(_id).populate(['roles']).exec();
  }

  findByApiKey(apiKey: string) {
    return this.clientModel
      .findOne({ apiKey: apiKey })
      .populate(['roles'])
      .exec();
  }

  list(filters: ListClientDto) {
    return this.clientModel
      .find({ ...filters })
      .populate(['roles'])
      .exec();
  }

  update(payload: UpdateClientDto) {
    return this.clientModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .populate(['roles'])
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.clientModel.findByIdAndDelete(_id).populate('roles').exec();
  }
}

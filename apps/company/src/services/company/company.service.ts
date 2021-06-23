import { Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  ListCompaniesDto,
  UpdateCompanyDto,
} from '../../dto/company.dto';

@Injectable()
export class CompanyService {
  create(companyDto: CreateCompanyDto) {
    //TODO
  }

  findById(_id: string) {
    return {
      _id: _id,
      name: 'Company Name',
      city: 'Company City',
      country: 'Company Country',
      logoFilename: 'Company logo',
    };
  }

  list(filters: ListCompaniesDto) {
    return [
      {
        _id: '123',
        name: 'Company Name',
        city: 'Company City',
        country: 'Company Country',
        logoFilename: 'Company logo',
      },
    ];
  }

  update(payload: UpdateCompanyDto) {
    return {
      _id: '123',
      name: 'Company Name',
      city: 'Company City',
      country: 'Company Country',
      logoFilename: 'Company logo',
    };
  }

  async companiesForExperience(_id: string) {
    return await {
      _id: _id,
      name: 'Company Name',
      city: 'Company City',
      country: 'Company Country',
      logoFilename: 'Company logo',
    };
  }

  delete(_id: string) {
    return {
      _id: _id,
      name: 'Company Name',
      city: 'Company City',
      country: 'Company Country',
      logoFilename: 'Company logo',
    };
  }
}

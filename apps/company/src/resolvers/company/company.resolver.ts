import {
  Args,
  Resolver,
  ResolveReference,
  Query,
  Mutation,
} from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company/company.service';
import {
  ListCompaniesDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from '../../dto/company.dto';
import { Roles, RoleType, JwtAuthGuard } from '@keadex/corelib';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query(() => Company, { name: 'company' })
  @Roles(RoleType.GUEST)
  @UseGuards(JwtAuthGuard)
  async getCompany(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ): Promise<Company> {
    return this.companyService.findById(_id);
  }

  @Query(() => [Company], { name: 'companies' })
  @Roles(RoleType.GUEST)
  @UseGuards(JwtAuthGuard)
  async getCompanies(
    @Args('filters', { nullable: true }) filters?: ListCompaniesDto,
  ) {
    return this.companyService.list(filters);
  }

  @Mutation(() => Company)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async createCompany(@Args('payload') payload: CreateCompanyDto) {
    return this.companyService.create(payload);
  }

  @Mutation(() => Company)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async updateCompany(@Args('payload') payload: UpdateCompanyDto) {
    return this.companyService.update(payload);
  }

  @Mutation(() => Company)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard)
  async deleteCompany(
    @Args('_id', { type: () => String }) _id: Schema.Types.ObjectId,
  ) {
    return this.companyService.delete(_id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: Schema.Types.ObjectId;
  }): Promise<Company> {
    return this.companyService.findById(reference._id);
  }
}

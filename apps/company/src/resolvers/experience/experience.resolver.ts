import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Experience } from '../../models/experience.model';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company/company.service';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly companyService: CompanyService) {}

  @ResolveField(() => [Company], { name: 'companies' })
  public companies(@Parent() experience: Experience) {
    return this.companyService.companiesForExperience(experience._id);
  }
}

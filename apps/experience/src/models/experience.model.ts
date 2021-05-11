import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Task } from './task.model';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Experience {
  @Field(() => String)
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  role: string;

  @Field()
  @Prop()
  from: string;

  @Field()
  @Prop()
  to?: string;

  @Field()
  @Prop()
  avatarFileName: string;

  @Field(() => [String])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Task.name })
  tasks: MongooseSchema.Types.ObjectId[];
  //tasks?: Task[];

  // @Field((type) => [Company])
  // companies: Company[];

  // @Field((type) => [Customer])
  // customers: Customer[];

  // @Field((type) => [Sector])
  // sectors: Sector[];

  // @Field((type) => [Skill])
  // skills: Skill[];
}

export type ExperienceDocument = Experience & Document;

export const ExperienceSchema = SchemaFactory.createForClass(Experience);

// "id": "MOBILE_DEVELOPER",
//         "from": "2013",
//         "to": "2015",
//         "avatarFilename": "jack-mobile.png",
//         "tasks": [
//           {
//             "id": "REQUIREMENTS_ANALYSIS"
//           },
//           {
//             "id": "DESIGN"
//           },
//           {
//             "id": "APP_DEVELOPMENT"
//           },
//           {
//             "id": "TEAM_LEADING"
//           }
//         ],
//         "companies": [
//           {
//             "name": "University of Liverpool",
//             "from": "09/2013",
//             "to": "12/2013",
//             "city": "LIVERPOOL",
//             "country": "UK",
//             "logoFilename": "univ-liverpool-logo.png"
//           },
//           {
//             "name": "Open Reply",
//             "from": "01/2014",
//             "to": "05/2015",
//             "city": "ROME",
//             "country": "ITALY",
//             "logoFilename": "open-reply-logo.png"
//           }
//         ],
//         "customers": [
//           {
//             "id": "1",
//             "name": "University of Liverpool",
//             "logoFilename": "univ-liverpool-logo.png"
//           },
//           {
//             "id": "2",
//             "name": "Eni",
//             "logoFilename": "eni-logo.png"
//           },
//           {
//             "id": "3",
//             "name": "CNH Industrial",
//             "logoFilename": "cnh-logo.png"
//           },
//           {
//             "id": "4",
//             "name": "Veneto Banca",
//             "logoFilename": "veneto-banca-logo.png"
//           }
//         ],
//         "sectors": [
//           {
//             "id": "HEALTHCARE"
//           },
//           {
//             "id": "UTILITIES"
//           },
//           {
//             "id": "RETAIL"
//           },
//           {
//             "id": "BANKING"
//           }
//         ],
//         "skills": [
//           {
//             "name": "Native App",
//             "usagePercentage": 100
//           },
//           {
//             "name": "Hybrid Apps",
//             "usagePercentage": 70
//           },
//           {
//             "name": "Android",
//             "usagePercentage": 100
//           },
//           {
//             "name": "Apache Cordova",
//             "usagePercentage": 70
//           },
//           {
//             "name": "Sencha Touch",
//             "usagePercentage": 50
//           },
//           {
//             "name": "AngularJS",
//             "usagePercentage": 40
//           },
//           {
//             "name": "IBM Worklight",
//             "usagePercentage": 90
//           },
//           {
//             "name": "SVN",
//             "usagePercentage": 100
//           },
//           {
//             "name": "IBM RTC",
//             "usagePercentage": 80
//           },
//           {
//             "name": "UML",
//             "usagePercentage": 100
//           },
//           {
//             "name": "MySQL",
//             "usagePercentage": 20
//           },
//           {
//             "name": "SQLite",
//             "usagePercentage": 80
//           },
//           {
//             "name": "Cryptography",
//             "usagePercentage": 80
//           },
//           {
//             "name": "Caching Strategies",
//             "usagePercentage": 60
//           }
//         ]

// import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   constructor(readonly configService: ConfigService) {
//     super({
//       datasources: {
//         db: {
//           url: configService.get<string>('DATABASE_URL'),
//         },
//       },
//     });
//   }

//   async onModuleInit() {
//     console.log('onModuleInit');
//     await this.$connect();
//   }

//   async onModuleDestroy() {
//     console.log('onModuleDestroy');
//     await this.$disconnect();
//   }
// }

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

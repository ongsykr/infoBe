import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async register(email: string, password: string, name: string) {
    return await this.prismaService.user
      .create({
        data: {
          email,
          password,
          name,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error in register');
        }
        throw new InternalServerErrorException('unknown error in register');
      });
  }

  async findUserByEmail(email: string) {
    return await this.prismaService.user
      .findFirst({
        where: {
          email,
        },
        select: {
          password: true,
          uuid: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in findUserByEmail',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in findUserByEmail',
        );
      });
  }

  async findUserByUuid(uuid: string) {
    return this.prismaService.user
      .findUnique({
        where: {
          uuid,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in findUserByUuid',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in findUserByUuid',
        );
      });
  }
}

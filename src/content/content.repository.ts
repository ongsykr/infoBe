import { PrismaService } from 'src/prisma/prisma.service';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';

export class ContentRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: string, data: createDto) {
    const prisma = new PrismaClient();
    return prisma.contents
      .create({
        data: {
          authorId: user,
          title: data.title,
          body: data.body,
          tag: data.tag,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error in create');
        }
        throw new InternalServerErrorException('unknown error in create');
      });
  }

  async delete(id: number) {
    const prisma = new PrismaClient();
    return prisma.contents
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error in delete');
        }
        throw new InternalServerErrorException('unknown error in delete');
      });
  }

  async update(data: updateDto) {
    const prisma = new PrismaClient();
    return prisma.contents
      .update({
        where: {
          id: data.id,
        },
        data: data,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error in update');
        }
        throw new InternalServerErrorException('unknown error in update');
      });
  }

  async findByTag(tag: string) {
    const prisma = new PrismaClient();
    return prisma.contents
      .findMany({
        where: {
          tag,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error in findByTag');
        }
        throw new InternalServerErrorException('unknown error in findByTag');
      });
  }

  async findById(id: number) {
    const prisma = new PrismaClient();
    return prisma.contents
      .findUnique({
        where: {
          id,
        },
        select: { authorId: true },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error in findById');
        }
        throw new InternalServerErrorException('unknown error in findById');
      });
  }

  async findByKeyword(keyword: string) {
    const prisma = new PrismaClient();
    return prisma.contents
      .findMany({
        where: {
          OR: [
            {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
            {
              body: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          ],
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error in findByKeyword',
          );
        }
        throw new InternalServerErrorException(
          'unknown error in findByKeyword',
        );
      });
  }
}

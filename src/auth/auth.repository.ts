import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async register(email: string, password: string, name: string) {
    const prisma = new PrismaClient();

    return await prisma.user
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
    const prisma = new PrismaClient();

    return await prisma.user
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
    const prisma = new PrismaClient();
    return prisma.user
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

// 1. 유저는 식별번호, 이름, 이메일, 가입일, 비밀번호
// 2. 비밀번호 암호화 - 디비 저장
// 3. 어떤 api 에서도 비밀번호 노출 X
// 4. 회원가입, 로그인을 하여 게시물 작성할 수 있다
// 5. 게시물은 제목본문생성날짜태그글쓴이정보포함
// 7. 특정글자가 제목, 본문에 들어간 게시물을 검색 가능
// 8. 특정 태그를 가진 게시물 가져오기
// 9. 게시물을글쓰니이만 수정삭제

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthRepository } from './auth.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './guard/auth.strategy';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [AuthService, AuthRepository, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

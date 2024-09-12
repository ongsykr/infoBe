import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { signUpDto } from './dto/signUp.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(data: signUpDto) {
    const user = await this.authRepository.findUserByEmail(data.email);
    console.log(user);
    if (user) {
      throw new ConflictException(`${data.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.authRepository.register(
      data.email,
      hashedPassword,
      data.name,
    );
  }

  async login(data: loginDto) {
    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new NotFoundException(`${data.email} doesn't exist.`);
    }
    const matching = await bcrypt.compare(data.password, user.password);
    if (matching) {
      const accessToken = this.getAccessToken(user.uuid);
      const refreshToken = this.getRefreshToken(user.uuid);
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('password doesnt correct.');
    }
  }

  getAccessToken(userUuid: string) {
    const accessToken = this.jwtService.sign(
      {
        uuid: userUuid,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
    return accessToken;
  }

  getRefreshToken(userUuid: string) {
    return this.jwtService.sign(
      {
        uuid: userUuid,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: this.configService.get<number>('REFRESH_TOKEN_EXPIRES_IN'),
      },
    );
  }

  async refresh(refreshToken: string) {
    const secret = this.configService.get<string>('REFRESH_TOKEN_KEY');
    if (!this.jwtService.verify(refreshToken, { secret })) {
      throw new UnauthorizedException('Invalid RefreshToken');
    }
    const data = this.jwtService.decode(refreshToken);
    const user = await this.authRepository.findUserByUuid(data.uuid);
    if (!user) {
      throw new NotFoundException(`${data.uuid} doesn't exist.`);
    }
    const newAccess = this.getAccessToken(user.uuid);
    return newAccess;
  }
}

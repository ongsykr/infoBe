import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { loginDto } from './dto/login.dto';
import { refreshDto } from './dto/refresh.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { sign } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'sing up',
    description: 'Enter email, password and name to register',
  })
  @ApiBody({ type: signUpDto })
  signUp(@Body() body: signUpDto) {
    // const prisma = new PrismaClient();
    // const email = 'example1@example.com';
    // const password = 'securepassword';
    // const name = 'John Doe';
    // const uuid = '123e4007-e89b-12d3-a456-426614174010';

    // async function testQuery() {
    //   try {
    //     await prisma.user.create({
    //       data: {
    //         uuid,
    //         email,
    //         password,
    //         name,
    //       },
    //     });
    //     console.log('Query executed successfully');
    //   } catch (error) {
    //     console.error('Error executing query:', error);
    //   }
    // }

    // return testQuery();
    return this.authService.signUp(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'log in',
    description: 'Enter email and password to log in.',
  })
  @ApiBody({ type: loginDto })
  login(@Body() body: loginDto) {
    return this.authService.login(body);
  }

  @Post('/refresh')
  @ApiOperation({
    summary: 'refreshToken',
    description: 'Enter refreshToken to get accessToken.',
  })
  @ApiBody({ type: loginDto })
  refresh(@Body() body: refreshDto) {
    return this.authService.refresh(body.refresh);
  }
}

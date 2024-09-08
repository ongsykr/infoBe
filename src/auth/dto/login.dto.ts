import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { signUpDto } from './signUp.dto';

export class loginDto extends PickType(signUpDto, [
  'email',
  'password',
] as const) {}

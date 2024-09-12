import { PickType } from '@nestjs/swagger';
import { signUpDto } from './signUp.dto';

export class loginDto extends PickType(signUpDto, [
  'email',
  'password',
] as const) {}

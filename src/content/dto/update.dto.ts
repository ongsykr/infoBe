import { ApiProperty, PartialType } from '@nestjs/swagger';
import { createDto } from './create.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class updateDto extends PartialType(createDto) {
  @ApiProperty({
    example: 4,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

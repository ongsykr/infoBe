import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class refreshDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWU5OWMzZmItYTIwMi00OTEwLTgwZDItOWI2MzI3ZWFlYTlkIiwiaWF0IjoxNzI1ODAwODI2LCJleHAiOjE3MjU4MDQ0MjZ9.Lv7fttvqpDW4m9pb-Y4oil3L8IEtIXh6OlEtoiH8Eek',
  })
  @IsString()
  @IsNotEmpty()
  refresh: string;
}

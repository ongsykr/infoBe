import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createDto {
  @ApiProperty({ example: 'title of the content' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the body of the content. ' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    example: 'new',
    description: 'Optional tag associated with the content',
    required: false,
  })
  @IsString()
  @IsOptional()
  tag: string;
}

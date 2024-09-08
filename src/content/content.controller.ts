import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { createDto } from './dto/create.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { getUser } from 'src/auth/guard/decorator/getUser';
import { updateDto } from './dto/update.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create Content',
  })
  @ApiBody({ type: createDto })
  create(@getUser() user: string, @Body() body: createDto) {
    return this.contentService.create(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete Content',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  delete(@getUser() user: string, @Param('id') id: number) {
    return this.contentService.delete(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiOperation({
    summary: 'Update Content',
  })
  @ApiBody({ type: updateDto })
  update(@getUser() user: string, @Body() body: updateDto) {
    return this.contentService.update(user, body);
  }

  @Get('/tag/:tag')
  @ApiOperation({
    summary: 'Find Content by Tag',
  })
  @ApiParam({
    name: 'tag',
    type: String,
  })
  findByTag(@Param('tag') tag: string) {
    return this.contentService.findByTag(tag);
  }

  @ApiOperation({
    summary: 'Find Content by Keyword',
  })
  @ApiParam({
    name: 'keyword',
    type: String,
  })
  @Get('/keyword/:keyword')
  findBykeyword(@Param('keyword') keyword: string) {
    return this.contentService.findByKeyword(keyword);
  }
}

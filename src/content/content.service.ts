import {
  Body,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ContentRepository } from './content.repository';
import { createDto } from './dto/create.dto';
import { NotFoundError } from 'rxjs';
import { compare } from 'bcrypt';
import { updateDto } from './dto/update.dto';

@Injectable()
export class ContentService {
  constructor(private contentRepository: ContentRepository) {}

  create(user: string, data: createDto) {
    return this.contentRepository.create(user, data);
  }

  findByTag(tag: string) {
    return this.contentRepository.findByTag(tag);
  }

  async delete(user: string, id: number) {
    if (await this.checkAuthor(user, id)) {
      return this.contentRepository.delete(id);
    } else {
      throw new UnauthorizedException('Content can be deleted by author.');
    }
  }

  async update(user: string, data: updateDto) {
    if (await this.checkAuthor(user, data.id)) {
      return this.contentRepository.update(data);
    } else {
      throw new UnauthorizedException('Content can be updated by author.');
    }
  }

  async checkAuthor(user: string, id: number) {
    const content = await this.contentRepository.findById(id);
    if (!content) {
      throw new NotFoundException(`${id} content doesn't exist.`);
    }
    if (content.authorId === user) {
      return true;
    }
    return false;
  }

  async findByKeyword(keyword: string) {
    return this.contentRepository.findByKeyword(keyword);
  }
}

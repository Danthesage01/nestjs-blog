import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
 constructor(
  /**
   * Injecting metaOptions repository
   */
  @InjectRepository(MetaOption)
  private metaOptionsRepository: Repository<MetaOption>,
 ) { }

 /**
  *method to create meta options
  */
 public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
  let metaOption = this.metaOptionsRepository.create(
   createPostMetaOptionsDto,
  );
  return await this.metaOptionsRepository.save(metaOption);
 }
}
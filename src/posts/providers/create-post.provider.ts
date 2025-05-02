import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class CreatePostProvider {
 constructor(
  @InjectRepository(Post)
  private readonly postsRepository: Repository<Post>,

  private readonly usersService: UsersService,

  private readonly tagsService: TagsService,




  @InjectRepository(MetaOption)
  private readonly metaOptionsRepository: Repository<MetaOption>,

  private readonly paginationProvider: PaginationProvider
 ) { }
 public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
  let author;
  let tags;
  try {
   author = await this.usersService.findOneById(user.sub);
   tags = await this.tagsService.findMultipleTags(createPostDto.tags || []);

   console.log(tags, "tags");

  } catch (error) {
   throw new ConflictException(error)
  }


  if (createPostDto.tags?.length !== tags.length) throw new BadRequestException('Please check your tag Ids')

  if (!author) throw new BadRequestException();
  const { metaOptions, ...postData } = createPostDto;

  let metaOptionsEntity = metaOptions
   ? this.metaOptionsRepository.create(metaOptions)
   : undefined;

  if (metaOptionsEntity) {
   await this.metaOptionsRepository.save(metaOptionsEntity);
  }

  let post = this.postsRepository.create({
   ...postData,
   author,
   metaOptions: metaOptionsEntity,
   tags
  });

  try {

   return await this.postsRepository.save(post);
  } catch (error) {
   throw new ConflictException(error, {
    description: 'Ensure post slug is unique and not a duplicate'
   })
  }
 }
}

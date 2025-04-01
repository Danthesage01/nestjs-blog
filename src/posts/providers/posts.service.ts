import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {
 constructor(
  /**
  * Inject metaOptionsRepository
  */
  private readonly usersService: UsersService,

  @InjectRepository(Post)
  private readonly postsRepository: Repository<Post>,


  @InjectRepository(MetaOption)
  private readonly metaOptionsRepository: Repository<MetaOption>,
 ) { }

 /**
 *Creating new posts
 * 
 */
 // public async create(createPostDto: CreatePostDto) {

 //  const author = await this.usersService.findOneById(createPostDto.authorId)

 //  let metaOptions: MetaOption | undefined;

 //  if (createPostDto.metaOptions) {
 //   metaOptions = this.metaOptionsRepository.create({
 //    metaValue: createPostDto.metaOptions.metaValue,
 //   });

 //   metaOptions = await this.metaOptionsRepository.save(metaOptions);
 //  }

 //  console.log(createPostDto, "service");

 //  let post = this.postsRepository.create({
 //   ...createPostDto,
 //   author: { id: author?.id } as User
 //  });


 //  return await this.postsRepository.save(post);
 // }

 public async create(createPostDto: CreatePostDto) {
  const author = await this.usersService.findOneById(createPostDto.authorId);
  if (!author) throw new Error("Author not found");

  const { authorId, metaOptions, ...postData } = createPostDto;

  let metaOptionsEntity = metaOptions
   ? this.metaOptionsRepository.create(metaOptions)
   : undefined;

  if (metaOptionsEntity) {
   await this.metaOptionsRepository.save(metaOptionsEntity);
  }

  let post = this.postsRepository.create({
   ...postData,
   author,
   metaOptions: metaOptionsEntity
  });

  return await this.postsRepository.save(post);
 }

 /**
 *Finding all posts
 * 
 */
 public async findAllPosts(userId: number) {
  let posts = await this.postsRepository.find({
   relations: {
    metaOptions: true,
    author: true
   }
  })
  console.log(posts);
  return posts
 }

 /**
 *Finding a post
 * 
 */
 public async findSinglePost(id: number) {
  let post = await this.postsRepository.findOneBy({
   id
  })
  console.log(post, "here single");
  return post
 }



 /**
 *delete a post
 * 
 */
 public async deletePost(id: number) {
  await this.postsRepository.delete(id)

  return { deleted: true, id }
 }
}

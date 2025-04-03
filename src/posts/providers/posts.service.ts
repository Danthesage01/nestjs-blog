import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { User } from 'src/users/user.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchUserDto } from 'src/users/dtos/patch-user.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class PostsService {
 constructor(
  /**
  * Inject metaOptionsRepository
  */
  private readonly usersService: UsersService,

  private readonly tagsService: TagsService,

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
  const tags = await this.tagsService.findMultipleTags(createPostDto.tags || []);
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
   metaOptions: metaOptionsEntity,
   tags
  });

  return await this.postsRepository.save(post);
 }

 /**
 *Update a post
 * 
 */
 public async update(patchPostDto: PatchPostDto) {
  let tags: Tag[] | null
  let post: Post | null

  try {

   tags = await this.tagsService.findMultipleTags(patchPostDto.tags || [])


  } catch (error) {
   throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
    description: 'Error connecting to the database'
   })
  }

  if (!tags || tags.length !== patchPostDto.tags?.length) {
   throw new BadRequestException('Please check your tag Ids and ensure they are correct')
  }

  try {
   post = await this.postsRepository.findOneBy({
    id: patchPostDto.id,
   })
  } catch (error) {
   throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
    description: 'Error connecting to the database'
   })
  }

  if (!post) {
   throw new BadRequestException('Post ID not found'); // or handle it in a way that suits your application
  }

  post.title = patchPostDto.title ?? post?.title
  post.content = patchPostDto.content ?? post?.content
  post.status = patchPostDto.status ?? post?.status
  post.postType = patchPostDto.postType ?? post?.postType
  post.slug = patchPostDto.slug ?? post?.slug
  post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post?.featuredImageUrl
  post.publishedOn = patchPostDto.publishedOn ?? post?.publishedOn

  post.tags = tags

  try {
   await this.postsRepository.save(post)
  } catch (error) {
   throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
    description: 'Error connecting to the database'
   })
  }
  return post
 }
 /**
 *Finding all posts
 * 
 */
 public async findAllPosts(userId: number) {
  let posts = await this.postsRepository.find({
   relations: {
    metaOptions: true,
    author: true,
    tags: true
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

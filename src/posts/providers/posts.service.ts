import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';

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
 //  // Create the metaOptions first if they exist
 //  let metaOptions = createPostDto.metaOptions
 //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
 //   : null;

 //  if (metaOptions) {
 //   await this.metaOptionsRepository.save(metaOptions);
 //  }

 //  // Create the post
 //  let post = this.postsRepository.create({ ...createPostDto, metaOptions: metaOptions ?? undefined });

 //  // // If meta options exist add them to post
 //  // if (metaOptions) {
 //  //  post.metaOptions = metaOptions;
 //  // }
 //  console.log(post, "Post");
 //  return await this.postsRepository.save(post);
 // }
 public async create(createPostDto: CreatePostDto) {
  console.log(createPostDto, "service");
  let metaOptions: MetaOption | null = null;

  if (createPostDto.metaOptions) {
   metaOptions = this.metaOptionsRepository.create({
    metaValue: createPostDto.metaOptions.metaValue,
   });

   metaOptions = await this.metaOptionsRepository.save(metaOptions);
  }

  // Create the post with metaOptions correctly typed
  let post = this.postsRepository.create({
   ...createPostDto,
   metaOptions: metaOptions ?? undefined, // Ensure it's undefined instead of null
  });

  console.log(post, "post service");
  return await this.postsRepository.save(post);
 }

 /**
 *Finding all posts
 * 
 */
 public async findAllPosts(userId: string) {
  const user = this.usersService.findOneById(userId)


  let posts = await this.postsRepository.find()

  // let posts = await this.postsRepository.find({
  //  relations: {
  //   metaOptions: true
  //  }
  // })
  return posts
 }
 public async deletePost(id: number) {
  await this.postsRepository.delete(id)
  // await this.metaOptionsRepository.delete(post?.metaOptions?.id || 0)

  // let post = await this.postsRepository.findOneBy({ id })
  // let inversePost = await this.metaOptionsRepository.find({
  //  where: { id: post?.metaOptions?.id },
  //  relations: {
  //   post: true
  //  }
  // })
  // console.log(inversePost);
  return { deleted: true, id }
 }
}

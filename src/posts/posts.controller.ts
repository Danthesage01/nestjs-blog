import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './providers/posts.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get.posts.dto';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
 constructor(private readonly postsService: PostsService) { }

 @Get('/{:userId}')
 public getPosts(@Param('userId') userId: string, @Query() postQuery: GetPostsDto) {
  console.log(postQuery);
  return this.postsService.findAllPosts(postQuery, userId)
 }


 @Get('/single/:id')
 public getSinglePost(@Param('id', ParseIntPipe) id: number) {
  return this.postsService.findSinglePost(id)
 }

 @Post()
 @ApiOperation({ summary: 'Creates a new blog post' })
 @ApiResponse({
  status: 201,
  description: 'You get a 201 response if your post is created successfully'
 })

 public createPost(@Body() createPostDto: CreatePostDto, @ActiveUser() user: ActiveUserData) {
  return this.postsService.create(createPostDto, user)
 }
 // public createPost(@Req() request) {
 //  console.log(request[REQUEST_USER_KEY]);
 // }


 @ApiOperation({ summary: 'Updates a blog post' })
 @ApiResponse({
  status: 200,
  description: 'You get a 200 response if your post is updated successfully'
 })
 @Patch()
 public updatePost(@Body() patchPostDto: PatchPostDto) {
  return this.postsService.update(patchPostDto)
 }

 @ApiOperation({ summary: 'deletes a blog post and cascade to meta options' })
 @ApiResponse({
  status: 200,
  description: 'You get a 200 response if your post is deleted successfully'
 })
 @Delete()
 public deletePost(@Query('id', ParseIntPipe) id: number) {
  console.log(id);
  return this.postsService.deletePost(id)
 }
}

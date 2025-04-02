import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './providers/posts.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
 constructor(private readonly postsService: PostsService) { }

 @Get()
 public getPosts(@Param('userId') userId: number) {
  return this.postsService.findAllPosts(userId)
 }


 @Get('/:id')
 public getSinglePost(@Param('id', ParseIntPipe) id: number) {
  return this.postsService.findSinglePost(id)
 }

 @Post()
 @ApiOperation({ summary: 'Creates a new blog post' })
 @ApiResponse({
  status: 201,
  description: 'You get a 201 response if your post is created successfully'
 })
 public createPost(@Body() createPostDto: CreatePostDto) {
  return this.postsService.create(createPostDto)
 }


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

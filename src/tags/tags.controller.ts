import { TagsService } from './providers/tags.service';
import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
 constructor(
  /**
   * Inject TagService
   */
  private readonly tagService: TagsService
 ) { }

 @ApiOperation({ summary: 'Create a tag on the application' })
 @ApiResponse({
  status: 200,
  description: 'Tag created successfully'
 })
 @Post()
 public createTags(@Body() createTagDto: CreateTagDto) {
  return this.tagService.create(createTagDto)
 }


 @ApiOperation({ summary: 'Delete a tag on the application' })
 @ApiResponse({
  status: 200,
  description: 'Tag deleted successfully'
 })
 @Delete()
 public deleteTag(@Query('id', ParseIntPipe) id: number) {
  return this.tagService.delete(id)
 }

 @ApiOperation({ summary: 'Soft delete a tag on the application' })
 @ApiResponse({
  status: 200,
  description: 'Tag deleted successfully'
 })
 @Delete('soft-delete')
 public softDeleteTag(@Query('id', ParseIntPipe) id: number) {
  return this.tagService.softRemove(id)
 }
}

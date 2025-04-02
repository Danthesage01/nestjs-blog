import { TagsService } from './providers/tags.service';
import { Body, Controller, Post } from '@nestjs/common';
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
}

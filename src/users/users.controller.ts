import { UsersService } from './providers/users.service';
import {
 Controller, Get, Post, Patch,
 Put, Delete, Param, Query, Body,

 ParseIntPipe, DefaultValuePipe, ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';



@Controller('users')
@ApiTags('Users')
export class UsersController {
 constructor(private readonly usersService: UsersService) { }

 @Get('/{:id}')
 @ApiOperation({ summary: 'Fetches a list of registered users on the application' })
 @ApiResponse({
  status: 200,
  description: 'User fetched successfully'
 })
 @ApiQuery({
  name: 'limit',
  type: 'number',
  required: false,
  description: 'The number of entries returned per query',
  example: 10,
 })
 @ApiQuery({
  name: 'page',
  type: 'number',
  required: false,
  description: 'The position of the page number that you want the API to return',
  example: 1,
 })
 public getUsers(
  @Param() getUserParamDto: GetUsersParamDto,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
 ) {
  return this.usersService.findAll(getUserParamDto, limit, page)
 }


 @ApiOperation({ summary: 'Register a user on the application' })
 @ApiResponse({
  status: 201,
  description: 'User created successfully'
 })
 @Post()
 public createUsers(@Body() createUserDto: CreateUserDto) {
  return this.usersService.createUser(createUserDto)
 }

 @ApiOperation({ summary: 'Register many users on the application using transaction' })
 @ApiResponse({
  status: 201,
  description: 'Users created successfully'
 })
 @Post('create-many')
 public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
  return this.usersService.createMany(createManyUsersDto)
 }


 @ApiOperation({ summary: 'Update a user on the application' })
 @ApiResponse({
  status: 200,
  description: 'User updated successfully'
 })
 @Patch()
 public patchUser(@Body() patchUserDto: PatchUserDto) {
  console.log(patchUserDto);
 }

 @ApiOperation({ summary: 'Delete a user on the application' })
 @ApiResponse({
  status: 200,
  description: 'User deleted successfully'
 })
 @Delete()
 public deleteUser() {
  return "You sent a delete request to users endpoint"
 }
}

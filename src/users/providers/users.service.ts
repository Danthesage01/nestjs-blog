import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";


/**
 * Class to connect to Users table and perform business operations 
 */
@Injectable()
export class UsersService {
 /**
* The constructor to handle dependency injections
*/
 constructor(
  @InjectRepository(User)
  private usersRepository: Repository<User>,
  @Inject(forwardRef(() => AuthService))
  private readonly authService: AuthService
 ) { }

 /**
 * The method to create a user from the database
 */
 public async createUser(createUserDto: CreateUserDto) {
  // Check is user exists with same email
  const existingUser = await this.usersRepository.findOne({
   where: {
    email: createUserDto.email
   }
  })
  // Handle exception
  // Create a new user
  let newUser = this.usersRepository.create(createUserDto)
  newUser = await this.usersRepository.save(newUser)

  return newUser
 }

 /**
 * The method to get all the users from the database
 */
 public findAll(
  getUserParamDto: GetUsersParamDto,
  limit: number,
  page: number

 ) {
  const isAuth = this.authService.isAuth()
  console.log(isAuth);
  return [
   {
    firstName: "John",
    lastName: "Doe",
   },
   {
    firstName: "Ken",
    lastName: "Doe",
   },
  ]
 }

 /**
* The method to get a single user from the database
*/
 public async findOneById(id: number) {
  return await this.usersRepository.findOneBy({
   id
  })
 }
}
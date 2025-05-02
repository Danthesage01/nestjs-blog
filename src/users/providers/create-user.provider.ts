import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
 constructor(
  /**
   * Inject user and auth repository
   */
  @InjectRepository(User)
  private usersRepository: Repository<User>,
  /**
 * Inject auth repository a circular dependency
 */
  // @Inject(forwardRef(() => AuthService))
  // private readonly authService: AuthService,

  /**
 * Inject auth repository a circular dependency
 */
  @Inject(forwardRef(() => HashingProvider))
  private readonly hashingProvider: HashingProvider,

  /**
 * Inject mail service
 */
  private readonly mailService: MailService,


 ) { }
 /**
 * The method to create a user from the database
 */
 public async createUser(createUserDto: CreateUserDto) {

  let existingUser: User | null;
  try {
   // Check is user exists with same email
   existingUser = await this.usersRepository.findOne({
    where: {
     email: createUserDto.email
    }
   })

  } catch (error) {
   throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
    description: 'Error connecting to the database'
   })
  }
  // Handle exception
  if (existingUser) {
   throw new BadRequestException('User already exist')
  }
  // Create a new user
  let newUser = this.usersRepository.create({ ...createUserDto, password: await this.hashingProvider.hashPassword(createUserDto.password) })
  try {
   newUser = await this.usersRepository.save(newUser)
  } catch (error) {
   throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
    description: 'Error connecting to the database'
   })
  }

  try {
   await this.mailService.sendUserWelcome(newUser)
  } catch (error) {
   console.log(error);
   throw new RequestTimeoutException(error)
  }

  return newUser
 }
}

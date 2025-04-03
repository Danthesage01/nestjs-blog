import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserDto } from './../dtos/create-user.dto';
import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { DataSource, Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";
import { error } from "console";
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';


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
    private readonly authService: AuthService,
    /**
     * Injecting config service
      */
    private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // Inject Datasource
    private readonly datasource: DataSource,

    /**
    * Injecting user create many providers
     */
    private readonly userCreateManyProvider: UsersCreateManyProvider
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
    let newUser = this.usersRepository.create(createUserDto)
    try {
      newUser = await this.usersRepository.save(newUser)
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
        description: 'Error connecting to the database'
      })
    }

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

    throw new HttpException({
      status: HttpStatus.MOVED_PERMANENTLY,
      error: 'The API endpoint does not exist',
      fileName: 'users.service.ts',
      lineNumber: 88
    },
      HttpStatus.MOVED_PERMANENTLY
      , {
        cause: new Error(),
        description: 'Occurred because the API endpoint was permanently moved'
      })
    // const environment = this.configService.get<string>('S3_BUCKET')
    // console.log(environment);
    // console.log(this.profileConfiguration);
    // const isAuth = this.authService.isAuth()
    // return [
    //   {
    //     firstName: "John",
    //     lastName: "Doe",
    //   },
    //   {
    //     firstName: "Ken",
    //     lastName: "Doe",
    //   },
    // ]
  }

  /**
 * The method to get a single user from the database
 */
  public async findOneById(id: number) {
    let user: User | null;
    try {
      user = await this.usersRepository.findOneBy({
        id
      })
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
        description: 'Error connecting to the database'
      })
    }
    if (!user) {
      throw new BadRequestException('The user id does not exist')
    }
    return user
  }

  /**
   * Create many user - Transaction in nestjs
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProvider.createMany(createManyUsersDto)
  }
}
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneByGoogleIdProviderService } from './find-one-by-google-id.provider.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
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
import { CreateUserProvider } from './create-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';


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
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,
    // /**
    //  * Injecting config service
    //   */
    // private readonly configService: ConfigService,

    // @Inject(profileConfig.KEY)
    // private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // // Inject Datasource
    // private readonly datasource: DataSource,

    /**
    * Injecting user create many providers
     */
    private readonly userCreateManyProvider: UsersCreateManyProvider,
    /**
    * Injecting create user provider
     */
    private readonly createUserProvider: CreateUserProvider,
    /**
    * Injecting find one user by email provider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    /**
     * Inject findOneByGoogleIdProvider
     */
    private readonly findOneByGoogleIdProviderService: FindOneByGoogleIdProviderService,
    /**
     * Inject createGoogleUserProvider
     */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) { }

  /**
  * The method to create a user from the database
  */
  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto)
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
 * Find a user by email from the database
 */
  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email)
  }

  /**
   * Create many user - Transaction in nestjs
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProvider.createMany(createManyUsersDto)
  }


  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProviderService.findOneByGoogleId(googleId)
  }
  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser)
  }
}
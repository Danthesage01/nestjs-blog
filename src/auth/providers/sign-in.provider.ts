import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { SignInDto } from './../dtos/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
 constructor(
  /**
   * inject UsersService
   */
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService,
  /**
   * inject hashing provider
   */
  private readonly hashingProvider: HashingProvider,


  /**
 * inject generate tokens provider
 */
  private readonly generateTokensProvider: GenerateTokensProvider

 ) { }
 public async signIn(signInDto: SignInDto) {
  // Find the user using email ID
  // Throw an exception user not found
  let user = await this.usersService.findOneByEmail(signInDto.email)
  // Compare password to the hash

  let isEqual: boolean = false
  let currentPassword = user.password || ""

  try {
   isEqual = await this.hashingProvider.comparePassword(signInDto.password, currentPassword)
  } catch (error) {
   throw new RequestTimeoutException(error, {
    description: 'Could not compare passwords'
   })
  }
  if (!isEqual) {
   throw new UnauthorizedException('Incorrect Password')
  }

  return await this.generateTokensProvider.generateTokens(user)
  // // Send confirmation
  // const accessToken = await this.jwtService.signAsync({
  //  sub: user.id,
  //  email: user.email
  // } as ActiveUserData, {
  //  audience: this.jwtConfiguration.audience,
  //  issuer: this.jwtConfiguration.issuer,
  //  secret: this.jwtConfiguration.secret,
  //  expiresIn: this.jwtConfiguration.accessTokenTtl
  // })

  // return { accessToken }
 }

}

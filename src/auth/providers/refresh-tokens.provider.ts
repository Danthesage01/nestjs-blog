import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProvider {
 constructor(
  /**
   * inject jwt service
   */
  private readonly jwtService: JwtService,
  /**
   * inject jwt configuration
   */
  @Inject(jwtConfig.KEY)
  private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

  /**
   * inject UsersService
   */
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService,

  /**
 * inject generate tokens provider
 */
  private readonly generateTokensProvider: GenerateTokensProvider
 ) { }
 public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
  try {

   // verify the refresh token sent by the users - jwtService and jwtConfiguration
   const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(refreshTokenDto.refreshToken, {
    secret: this.jwtConfiguration.secret,
    audience: this.jwtConfiguration.audience,
    issuer: this.jwtConfiguration.issuer
   })
   // fetch the user from the database
   const user = await this.usersService.findOneById(sub)
   // Generate the tokens
   return await this.generateTokensProvider.generateTokens(user)
  } catch (error) {
   throw new UnauthorizedException(error)
  }
 }
}

import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from './../dtos/refresh-token.dto';
import { SignInProvider } from './sign-in.provider';
import { SignInDto } from './../dtos/signin.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {

 constructor(
  /**
   * inject users service
   */
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService,
  /**
  * inject sign in provider 
  */
  private readonly signInProvider: SignInProvider,

  /**
   * Refresh Token Provider
   */
  private readonly refreshTokensProvider: RefreshTokensProvider

 ) { }


 public async signIn(signInDto: SignInDto) {
  return await this.signInProvider.signIn(signInDto)
 }

 public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
  return await this.refreshTokensProvider.refreshTokens(refreshTokenDto)
 }
}

import { GenerateTokensProvider } from './../../providers/generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';
import { GoogleTokenDto } from './../dtos/google-token.dto';
import { ConfigType } from '@nestjs/config';
import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
 private oauth2Client: OAuth2Client

 constructor(
  /**
   * Inject JWT Configuration
   */
  @Inject(jwtConfig.KEY)
  private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  /**
   * Inject userService
   */
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService,

  /**
   * Generate Token Provider
   */
  private readonly generateTokensProvider: GenerateTokensProvider
 ) { }
 onModuleInit() {
  const clientId = this.jwtConfiguration.googleClientId
  const clientSecret = this.jwtConfiguration.googleClientSecret

  this.oauth2Client = new OAuth2Client(clientId, clientSecret)
 }

 public async authenticate(googleTokenDto: GoogleTokenDto) {
  try {
   // verify the Google Token sent by User
   const loginTicket = await this.oauth2Client.verifyIdToken({
    idToken: googleTokenDto.token
   })
   // console.log(loginTicket);

   let email = loginTicket.getPayload()?.email || ""
   let firstName = loginTicket.getPayload()?.given_name || ""
   let lastName = loginTicket.getPayload()?.family_name || ""
   let googleId = loginTicket.getPayload()?.sub || ""

   const user = await this.usersService.findOneByGoogleId(googleId)
   // // If googledId exists generate the token
   if (user) {
    return this.generateTokensProvider.generateTokens(user)
   }
   // If not create a new user and then generate tokens
   const newUser = await this.usersService.createGoogleUser({
    email,
    firstName,
    lastName,
    googleId
   })

   return this.generateTokensProvider.generateTokens(newUser)

  } catch (error) {
   // Throw Unauthorized exception
   throw new UnauthorizedException(error)
  }

 }
}

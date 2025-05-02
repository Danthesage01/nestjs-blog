import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { FindOneByGoogleIdProviderService } from './providers/find-one-by-google-id.provider.service';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    FindOneByGoogleIdProviderService,
    CreateGoogleUserProvider,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],

  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
    forwardRef(() => AuthModule),
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ]
})
export class UsersModule { }

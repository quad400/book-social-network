import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '@app/common';
import { TokenRepository } from '../user/repository/token.repository';
import { ProfileRepository } from '../user/repository/profile.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: AppConfig.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: AppConfig.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, TokenRepository, ProfileRepository],
})
export class AuthModule {}
